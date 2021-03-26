import express from "express";
import ReviewController from "../controllers/review.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new ReviewController();
  const response = await controller.getReviews();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new ReviewController();
  const response = await controller.createReview(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new ReviewController();
  const response = await controller.getReview(req.params.id);
  if (!response) res.status(404).send({ message: "No review found" });
  return res.send(response);
});

export default router;
