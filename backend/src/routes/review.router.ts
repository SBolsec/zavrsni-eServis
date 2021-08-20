import express from "express";
import ReviewController from "../controllers/review.controller";
import Joi from 'joi';
import auth from '../middlewares/isAuth';
import PersonController from "../controllers/person.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new ReviewController();
  const response = await controller.getReviews();
  return res.send(response);
});

router.post("/", auth([2]), async (req, res) => {
  try {
    await Joi.object({
      content: Joi.string().required(),
      score: Joi.number().required(),
      serviceId: Joi.number().required(),
    }).validateAsync(req.body);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const reviewController = new ReviewController();
  const personController = new PersonController()

  const author = await personController.getPersonByUserId(req.currentUser.id.toString());
  const authorReviews = await reviewController.getReviewsByAuthorId(author!.id.toString());

  authorReviews.forEach((review) => {
    if (review.serviceId === Number(req.body.serviceId)) {
      return res.status(400).json({message: "User already reviewed this service."})
    }
  });
  
  const response = await reviewController.createReview({
    content: req.body.content,
    score: req.body.score,
    serviceId: req.body.serviceId,
    authorId: author!.id
  });

  const review = await reviewController.getReview(response.id.toString());
  return res.send(review);
});

router.get("/id/:id", async (req, res) => {
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

router.get("/author/:id", async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const controller = new ReviewController();
  const response = await controller.getReviewsByAuthorId(req.params.id);
  if (!response) res.status(404).send({ message: "No reviews found" });
  return res.send(response);
});

router.put("/:id", auth([2]), async (req, res) => {
  try {
    await Joi.object({
      content: Joi.string().required(),
      score: Joi.number().required(),
      serviceId: Joi.number().required(),
    }).validateAsync(req.body);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const reviewController = new ReviewController();
  const personController = new PersonController()

  const author = await personController.getPersonByUserId(req.currentUser.id.toString());
  
  const response = await reviewController.updateReview(Number(req.params.id), {
    content: req.body.content,
    score: req.body.score,
    serviceId: req.body.serviceId,
    authorId: author!.id
  });

  const review = await reviewController.getReview(response.id.toString());
  return res.send(review);
});

router.delete("/:id", auth([2]), async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const reviewController = new ReviewController();
  const review = await reviewController.getReview(req.params.id);
  if (!review) return res.status(400).json({message: "Review does not exist."});

  if (review.author.userId !== req.currentUser.id)
    return res.status(400).json({message: "You are not authorized to delete this review."});

  await reviewController.deleteReview(req.params.id);

  return res.json({
    id: req.params.id
  });
});

export default router;
