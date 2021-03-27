import express from "express";
import UserController from "../controllers/user.controller";
import { compare } from 'bcryptjs';
import Joi from 'joi';
import { createAccessToken, createRefreshToken } from '../utils/auth';
import { sendRefreshToken } from '../utils/sendRefreshToken';
import PersonContorller from "../controllers/person.controller";
import ServiceController from "../controllers/service.controller";
import PictureController from "../controllers/picture.controller";

const router = express.Router();

export interface ILoginResponse {
  id: number,
  roleId: number,
  email: string,
  tokenVersion: number,
  profilePictureURL: string,
  profilePictureSet: boolean
};

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

    // postavi url do slike profila
    let profilePictureSet = false;
    let profilePictureURL = "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png";
    if (user.profilePictureId) {
      const pictureController = new PictureController();
      const picture = await pictureController.getPicture(user!.profilePictureId.toString());
      profilePictureSet = true;
      profilePictureURL = picture!.url;
    }

    const payload: ILoginResponse = {
      id: user.id,
      roleId: user.roleId,
      email: user.email,
      tokenVersion: user.tokenVersion,
      profilePictureURL,
      profilePictureSet
    };

    return res.status(200).json({
      accessToken: createAccessToken(user),
      user: payload
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