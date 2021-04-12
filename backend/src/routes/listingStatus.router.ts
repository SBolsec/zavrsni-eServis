import express from "express";
import ListingStatusController from "../controllers/listingStatus.controller";
import Joi from 'joi';
import auth from '../middlewares/isAuth';

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new ListingStatusController();
  const response = await controller.getListingStatuses();
  return res.send(response);
});

router.post("/", auth([1]), async (req, res) => {
  try {
    await Joi.object({
      name: Joi.string().required()
    }).validateAsync(req.body);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message});
  }

  const controller = new ListingStatusController();
  const response = await controller.createListingStatus(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message});
  }

  const controller = new ListingStatusController();
  const response = await controller.getListingStatus(req.params.id);
  if (!response) res.status(404).send({ message: "No listing status found" });
  return res.send(response);
});

export default router;
