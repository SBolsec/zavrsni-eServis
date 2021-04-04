import express from "express";
import UserController from "../controllers/user.controller";
import { compare } from 'bcryptjs';
import Joi from 'joi';
import { createAccessToken, createRefreshToken } from '../utils/auth';
import { sendRefreshToken } from '../utils/sendRefreshToken';
import { userToUserInfo } from "../mappers/userInfo.mapper";

const router = express.Router();

router.post("/", async (req, res) => {
  // provjera unesenih podataka
  const schema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
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

  const { email, password } = req.body;

  try {
    // provjera postoji li korisnik s tim emailom
    const userController = new UserController();
    const user = await userController.getUserByEmail(email);

    // korisnik ne postoji
    if (!user) {
      return res.status(400).json({
        error: true,
        message: "Pogrešan email ili lozinka"
      });
    }

    // provjera lozinke
    const match = await compare(password, user.password);

    if (!match) {
      return res.status(400).json({
        error: true,
        message: "Pogrešan email ili lozinka"
      });
    }

    sendRefreshToken(res, createRefreshToken(user));

    const userInfo = await userToUserInfo(user);

    return res.status(200).json({
      accessToken: createAccessToken(user),
      user: userInfo
    });
  } catch (error) {
    console.log(error);
    return res.json({
      error: true,
      message: "Greška na poslužitelju. Pokušajte ponovno kasnije i javite se administratoru."
    });
  }
});

export default router;