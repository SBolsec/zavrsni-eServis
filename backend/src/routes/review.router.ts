import express from "express";
import ReviewController from "../controllers/review.controller";
import Joi from 'joi';
import auth from '../middlewares/isAuth';

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new ReviewController();
  const response = await controller.getReviews();
  return res.send(response);
});

router.post("/", auth([1, 2]), async (req, res) => {
  try {
    await Joi.object({
      content: Joi.string().required(),
      score: Joi.number().required(),
      authorId: Joi.number().required(),
      serviceId: Joi.number().required(),
    }).validateAsync(req.body);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const controller = new ReviewController();
  const response = await controller.createReview(req.body);
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

  const controller = new ReviewController();
  const response = await controller.getReview(req.params.id);
  if (!response) res.status(404).send({ message: "No review found" });
  return res.send(response);
});

export default router;
