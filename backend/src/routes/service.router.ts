import { compare, hash } from "bcryptjs";
import express from "express";
import CityController from "../controllers/city.controller";
import PictureController from "../controllers/picture.controller";
import ServiceController from "../controllers/service.controller";
import UserController from "../controllers/user.controller";
import { IServicePayload } from "../repositories/service.repository";
import { ILoginResponse } from "./login.router";
import auth from '../middlewares/isAuth';
import Joi from 'joi';

const router = express.Router();

router.get("/", auth([1, 2, 3]), async (_req, res) => {
  const controller = new ServiceController();
  const response = await controller.getServices();
  return res.send(response);
});

router.post("/", auth([1, 2, 3]), async (req, res) => {
  const controller = new ServiceController();
  const response = await controller.createService(req.body);
  return res.send(response);
});

router.get("/:id", auth([1, 2, 3]), async (req, res) => {
  const controller = new ServiceController();
  const response = await controller.getService(req.params.id);
  if (!response) res.status(404).send({ message: "No service found" });
  return res.send(response);
});

router.get("/user/:id", auth([1, 3]), async (req, res) => {
  const controller = new ServiceController();
  const response = await controller.getServiceByUserId(req.params.id);
  if (!response) res.status(404).send({ message: "No service found" });
  const cityConttroller = new CityController();
  const city = await cityConttroller.getCity(response!.cityId.toString());
  return res.send({
    ...response,
    cityName: city!.postalCode + " " + city!.name
  });
});

router.put("/:id", auth([1, 3]), async (req, res) => {
  // provjera unesenih podataka
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    oib: Joi.string().pattern(new RegExp('[0-9]{11,11}')).required(),
    phone: Joi.string().pattern(new RegExp('[0-9]{6,11}')).required(),
    website: Joi.string().allow('').allow(null),
    description: Joi.string().allow('').allow(null),
    address: Joi.string().min(1).required(),
    cityId: Joi.number().required(),
    email: Joi.string().email().required(),
    currentPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).allow(''),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).allow(''),
    repeatPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).allow(''),
    userId: Joi.number().required()
  });

  try {
    await schema.validateAsync(req.body);
  }
  catch (err) {
    return res.status(400).json({
      message: "Neki od podataka je neispravan"
    });
  }

  // azuriranje login podataka
  const userController = new UserController();
  const user = await userController.getUserById(req.body.userId);
  if (!user) res.status(400).send({ message: "Nije pronađen korisnik" });
  const checkEmail = await userController.getUserByEmail(req.body.email);
  if (checkEmail) {
    if (user!.id !== checkEmail.id) {
      return res.status(400).json({
        message: "E-mail je već zauzet"
      });
    }
  }
  user!.email = req.body.email;
  if (!!req.body.password && !!req.body.currentPassword && !!req.body.repeatPassword) {
    // provjera lozinke
    const match = await compare(req.body.password, user!.password);

    if (!match || req.body.password !== req.body.repeatPassword) {
      return res.status(400).json({
        message: "Pogrešna lozinka"
      });
    }

    if (req.body.password === req.body.repeatPassword) {
      user!.password = await hash(req.body.password, 10);
    }
  }
  userController.updateUser(user!.id, user!);

  // azuriranje podataka servisera
  const serviceController = new ServiceController();
  const servicePayload: IServicePayload = {
    name: req.body.name,
    address: req.body.address,
    cityId: req.body.cityId,
    oib: req.body.oib,
    phone: req.body.phone,
    userId: req.body.userId,
    website: req.body.website,
    description: req.body.description
  };
  const service = await serviceController.updateService(
    req.params.id,
    servicePayload
  );
  if (!service) res.status(404).send({ message: "Nije pronađen serviser" });

  let profilePictureSet = false;
  let profilePictureURL =
    "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png";
  if (user!.profilePictureId) {
    const pictureController = new PictureController();
    const picture = await pictureController.getPicture(
      user!.profilePictureId.toString()
    );
    profilePictureSet = true;
    profilePictureURL = picture!.url;
  }

  const u: ILoginResponse = {
    email: user!.email,
    id: user!.id,
    profilePictureSet,
    profilePictureURL,
    roleId: user!.roleId,
    tokenVersion: user!.tokenVersion,
  };

  return res.send({
    user: u,
    service
  });
});

export default router;