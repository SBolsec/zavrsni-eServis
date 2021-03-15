import express from 'express';
import { hash } from 'bcryptjs';
import Joi from 'joi';
import UserController from '../controllers/user.controller';
import PersonController from '../controllers/person.controller';
import ServiceController from '../controllers/service.controller';
import { IPersonPayload } from '../repositories/person.repository';
import { IUserPayload } from '../repositories/user.repository';
import { IServicePayload } from '../repositories/service.repository';

const router = express.Router();

router.post('/user', async (req, res) => {
  // provjera unesenih podataka
  const schema = Joi.object({
    firstName: Joi.string().min(1).required(),
    lastName: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
  });

  try {
    await schema.validateAsync(req.body);
  }
  catch (err) {
    return res.status(400).json({
      error: true,
      message: err.details[0].message
    });
  }

  // podatci ispravni
  const { firstName, lastName, email, password } = req.body;

  try {
    // provjera postoji li korisnik sa tim emailom
    const userController = new UserController();
    const existingUser = await userController.getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        error: true,
        message: 'Već postoji račun s navedenom email adresom'
      });
    }

    // kriptiranje lozinke
    hash(password, 10, async (err, hashedPassword) => {
      // stvaranje korisnika u bazi
      const userPayload: IUserPayload = {
        email: email,
        password: hashedPassword,
        roleId: 2 // obican korisnik
      };

      const user = await userController.createUser(userPayload);

      const personController = new PersonController();
      const personPayload: IPersonPayload = {
        firstName, 
        lastName,
        userId: user.id
      };
      await personController.createPerson(personPayload);

      return res.status(200).json({
        success: true,
        message: 'Korisnički račun uspješno stvoren'
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send();
  }
});

router.post('/service', async (req, res) => {
  // provjera unesenih podataka
  const schema = Joi.object({
    companyName: Joi.string().min(1).required(),
    oib: Joi.string().pattern(new RegExp('[0-9]{11,11}')).required(),
    address: Joi.string().min(1).required(),
    city: Joi.number().required(),
    phone: Joi.string().pattern(new RegExp('[0-9]{6,11}')).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

  try {
    await schema.validateAsync(req.body);
  }
  catch (err) {
    return res.status(400).json({
      error: true,
      message: err.details[0].message
    });
  }

  // podatci ispravni
  const { companyName, oib, address, city, phone, email, password } = req.body;

  try {
    // provjera postoji li korisnik sa tim emailom
    const userController = new UserController();
    const existingUser = await userController.getUserByEmail(email);

    if (existingUser) {
      return res.status(400).json({
        error: true,
        message: 'Već postoji račun s navedenom email adresom'
      });
    }

    // kriptiranje lozinke
    hash(password, 10, async (err, hashedPassword) => {
      // stvaranje korisnika u bazi
      const userPayload: IUserPayload = {
        email: email,
        password: hashedPassword,
        roleId: 3 // serviser
      };

      const user = await userController.createUser(userPayload);

      const serviceController = new ServiceController();
      const servicePayload: IServicePayload = {
        address,
        cityId: city,
        name: companyName,
        oib,
        phone,
        userId: user.id
      };
      await serviceController.createService(servicePayload);

      return res.status(200).json({
        success: true,
        message: 'Korisnički račun uspješno stvoren'
      });
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send();
  }
});

export default router;