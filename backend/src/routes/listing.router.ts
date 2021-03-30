import express from "express";
import cloudinary from "../config/cloudinary";
import ListingController from "../controllers/listing.controller";
import PictureController from "../controllers/picture.controller";
import auth from "../middlewares/isAuth";
import { upload } from "../middlewares/upload";
import { Picture } from "../models";
import { IPicturePayload } from "../repositories/picture.repository";

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

router.post("/upload-pictures/:id", auth([1, 2]), upload.array("pictures[]", 10), async (req, res) => {
  let files: any = req.files;
  let listingId: number = Number(req.params.id);
  const pictureController = new PictureController();

  let pictures: Picture[] = [];
  for (let file of files) {
    try {
      let image = await cloudinary.uploader.upload(file.path);

      const picture: IPicturePayload = {
        name: image.original_filename,
        cloudinaryId: image.public_id,
        url: image.secure_url,
        listingId: listingId
      }

      let result = await pictureController.createPicture(picture);
      pictures = [...pictures, result];
    } catch (ignored) {}
  }

  return res.send(pictures);
});

router.get("/active/:id", async (req, res) => {
  const listingController = new ListingController();
  const listings = await listingController.getActiveListings(req.params.id);
  if (!listings) res.status(404).send({ message: "No listings found" });

  const pictureController = new PictureController();
  let response: any = listings;
  for (let listing of response) {
    let pictures = await pictureController.getPicturesByListing(listing.id.toString());
    let data: any = [];
    for (let pic of pictures) {
      data = [...data, {
        id: pic.id,
        name: pic.name,
        url: pic.url
      }];
    }
    listing.pictures = data;
  }

  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new ListingController();
  const response = await controller.getListing(req.params.id);
  if (!response) res.status(404).send({ message: "No listing found" });
  return res.send(response);
});

export default router;
