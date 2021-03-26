import express from "express";
import OfferStatusController from "../controllers/offerStatus.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new OfferStatusController();
  const response = await controller.getOfferStatuses();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new OfferStatusController();
  const response = await controller.createOfferStatus(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new OfferStatusController();
  const response = await controller.getOfferStatus(req.params.id);
  if (!response) res.status(404).send({ message: "No offer status found" });
  return res.send(response);
});

export default router;
