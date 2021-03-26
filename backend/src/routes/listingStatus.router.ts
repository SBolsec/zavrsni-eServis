import express from "express";
import ListingStatusController from "../controllers/listingStatus.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new ListingStatusController();
  const response = await controller.getListingStatuses();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new ListingStatusController();
  const response = await controller.createListingStatus(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new ListingStatusController();
  const response = await controller.getListingStatus(req.params.id);
  if (!response) res.status(404).send({ message: "No listing status found" });
  return res.send(response);
});

export default router;
