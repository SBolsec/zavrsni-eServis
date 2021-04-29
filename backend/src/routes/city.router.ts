import express from "express";
import CityController from "../controllers/city.controller";
import Joi from 'joi';
import auth from '../middlewares/isAuth';

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new CityController();
  const response = await controller.getCities();
  return res.send(response);
});

router.get('/formatted', async (req, res) => {
  const controller = new CityController();
  const response = await controller.getFormattedCities();
  res.send(response);
});

router.post("/", auth([1]), async (req, res) => {
  try {
    await Joi.object({
      name: Joi.string().min(1).required(),
      postalCode: Joi.string().pattern(new RegExp('^[0-9]{5,5}$')).required()
    }).validateAsync(req.body);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message })
  }
  
  const controller = new CityController();
  const response = await controller.createCity(req.body);
  return res.send(response);
});

router.get("/id/:id", async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message })
  }

  const controller = new CityController();
  const response = await controller.getCity(req.params.id);
  if (!response) res.status(404).send({ message: "No city found" });
  return res.send(response);
});

export default router;