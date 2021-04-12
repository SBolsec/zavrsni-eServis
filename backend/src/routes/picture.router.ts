import express from "express";
import PictureController from "../controllers/picture.controller";
import Joi from 'joi';
import auth from '../middlewares/isAuth';

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new PictureController();
  const response = await controller.getPictures();
  return res.send(response);
});

router.post("/", auth([1, 2, 3]), async (req, res) => {
  try {
    await Joi.object({
      name: Joi.string().required(),
      cloudinaryId: Joi.string().required(),
      url: Joi.string().required(),
      listingId: Joi.number()
    }).validateAsync(req.body);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const controller = new PictureController();
  const response = await controller.createPicture(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const controller = new PictureController();
  const response = await controller.getPicture(req.params.id);
  if (!response) res.status(404).send({ message: "No listing found" });
  return res.send(response);
});

export default router;
