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

router.put("/:id", async (req, res) => {
  const controller = new OfferController();
  const response = await controller.updateOffer(Number(req.params.id), req.body);
  if (!response) res.status(404).send({ message: "No offer found" });
  return res.send(response);
});

router.delete("/:id", async (req, res) => {
  const controller = new OfferController();
  const response = await controller.deleteOffer(Number(req.params.id));
  if (!response) res.status(404).send({ message: "No offer found" });
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new OfferController();
  const response = await controller.getOffer(req.params.id);
  if (!response) res.status(404).send({ message: "No offer found" });
  return res.send(response);
});

export default router;
