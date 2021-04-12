import express from "express";
import OfferController from "../controllers/offer.controller";
import Joi from 'joi';
import auth from '../middlewares/isAuth';

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new OfferController();
  const response = await controller.getOffers();
  return res.send(response);
});

router.post("/", auth([1, 3]), async (req, res) => {
  try {
    await Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      serviceId: Joi.number().required(),
      listingId: Joi.number().required(),
    }).validateAsync(req.body);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const controller = new OfferController();
  const response = await controller.createOffer(req.body);
  return res.send(response);
});

router.put("/:id", auth([1, 3]), async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const controller = new OfferController();
  const response = await controller.updateOffer(Number(req.params.id), req.body);
  if (!response) res.status(404).send({ message: "No offer found" });
  return res.send(response);
});

router.delete("/:id", auth([1, 3]), async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const controller = new OfferController();
  const response = await controller.deleteOffer(Number(req.params.id));
  if (!response) res.status(404).send({ message: "No offer found" });
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

  const controller = new OfferController();
  const response = await controller.getOffer(req.params.id);
  if (!response) res.status(404).send({ message: "No offer found" });
  return res.send(response);
});

export default router;
