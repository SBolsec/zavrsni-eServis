import express from "express";
import PictureController from "../controllers/picture.controller";
import UserController from "../controllers/user.controller";
import Joi from 'joi';
import auth from '../middlewares/isAuth';
import { upload } from "../middlewares/upload";
import cloudinary from '../config/cloudinary';
import { IPicturePayload } from "../repositories/picture.repository";
import { userToUserInfo } from "../mappers/userInfo.mapper";

const router = express.Router();

router.get("/", auth([1, 2, 3]), async (_req, res) => {
  const controller = new UserController();
  const response = await controller.getUsers();
  return res.send(response);
});

router.post("/", auth([1, 2, 3]), async (req, res) => {
  try {
    await Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().regex(new RegExp('^[a-zA-z0-9]{3-30}$')).required(),
      roleId: Joi.number().required(),
      profilePictureId: Joi.number()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const controller = new UserController();
  const response = await controller.createUser(req.body);
  return res.send(response);
});

router.get("/id/:id", async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const controller = new UserController();
  const response = await controller.getUserById(req.params.id);
  if (!response) res.status(404).send({ message: "No user found" });
  const userInfo = await userToUserInfo(response!);
  return res.send(userInfo);
});

router.get("/email/:email", auth([1, 2, 3]), async (req, res) => {
  try {
    await Joi.object({
      email: Joi.string().email().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const controller = new UserController();
  const response = await controller.getUserByEmail(req.params.email);
  if (!response) res.status(404).send({ message: "No user found" });
  return res.send(response);
});

router.post("/upload-picture/:id", auth([1, 2, 3]), upload.single('picture'), async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const userId = req.params.id;
  const file = req.file;

  const pictureController = new PictureController();
  const userController = new UserController();

  try {
    let image = await cloudinary.uploader.upload(file.path);

    const picture: IPicturePayload = {
      name: image.original_filename,
      cloudinaryId: image.public_id,
      url: image.secure_url
    }

    const result = await pictureController.createPicture(picture);

    const user = await userController.getUserById(userId);
    user!.profilePictureId = result.id;
    user!.profilePicture = result;
    await userController.updateUser(user!.id, user!);

    res.send({
      url: result.url
    });
  } catch (e) {
    res.status(400).send('Upload failed');
  }
});

export default router;
