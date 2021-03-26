import express from "express";
import OfferController from "../controllers/offer.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new OfferController();
  const response = await controller.getOffers();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new OfferController();
  const response = await controller.createOffer(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new OfferController();
  const response = await controller.getOffer(req.params.id);
  if (!response) res.status(404).send({ message: "No offer found" });
  return res.send(response);
});

export default router;
