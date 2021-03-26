import express from "express";
import ListingController from "../controllers/listing.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new ListingController();
  const response = await controller.getListings();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new ListingController();
  const response = await controller.createListing(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new ListingController();
  const response = await controller.getListing(req.params.id);
  if (!response) res.status(404).send({ message: "No listing found" });
  return res.send(response);
});

export default router;
