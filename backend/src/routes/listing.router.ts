import express from "express";
import ListingController from "../controllers/listing.controller";
import PictureController from "../controllers/picture.controller";
import auth from "../middlewares/isAuth";
import { upload } from "../middlewares/upload";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new ListingController();
  const response = await controller.getListings();
  return res.send(response);
});

router.post("/", auth([1, 2]), async (req, res) => {
  const controller = new ListingController();
  const response = await controller.createListing(req.body);
  return res.send(response);
});

router.get("/id/:id", async (req, res) => {
  const controller = new ListingController();
  const response = await controller.getListing(req.params.id);
  if (!response) res.status(404).send({ message: "No listing found" });
  return res.send(response);
});

router.post("/upload-pictures/:id", auth([1, 2]), upload.array("pictures[]", 10), async (req, res) => {
  const controller = new ListingController();
  const response = await controller.uploadPictures(req.params.id, req.files);
  return res.send(response);
});

router.get("/active/:id", async (req, res) => {
  const listingController = new ListingController();
  const listings: any = await listingController.getActiveListings(req.params.id);
  if (!listings) res.status(404).send({ message: "No listings found" });
  return res.send(listings);
});

export default router;
