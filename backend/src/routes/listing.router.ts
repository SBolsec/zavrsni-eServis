import express from "express";
import ListingController from "../controllers/listing.controller";
import auth from "../middlewares/isAuth";
import Joi from 'joi';
import { upload } from "../middlewares/upload";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new ListingController();
  const response = await controller.getListings();
  return res.send(response);
});

router.post("/", auth([1, 2]), async (req, res) => {
  try {
    await Joi.object({
      personId: Joi.number().required(),
      title: Joi.string().required(),
      description: Joi.string().required(),
      faultCategoryId: Joi.number().required(),
      cityId: Joi.number().required(),
      pictures: Joi.array().required()
    }).validateAsync(req.body);
  } catch (err) {
    console.log(req.body);
    console.log(err);
    return res.status(400).send({ message: err.details[0].message });
  }

  const controller = new ListingController();
  const response = await controller.createListing(req.body);
  return res.send(response);
});

router.get("/id/:id", async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const controller = new ListingController();
  const response: any = await controller.getListing(req.params.id);
  if (!response) res.status(404).send({ message: "No listing found" });

  // remove sensitive user information and add picture if there is none
  response.person.profilePicture = response.person.user.profilePicture;
  if (!response.person.profilePicture) {
    response.person.profilePicture = {
      id: 0,
      name: 'no-picture',
      url: "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png"
    }
  }
  delete response.person.user;

  // remove sensitive servicer information and add picture if there is none
  response.offers.forEach((offer: any) => {
    offer.service.profilePicture = offer.service.user.profilePicture;
    if (!offer.service.profilePicture) {
      offer.service.profilePicture = {
        id: 0,
        name: 'no-picture',
        url: "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png"
      }
    }
    delete offer.service.user;
  });

  return res.send(response);
});

router.post("/upload-pictures/:id", auth([1, 2]), upload.array("pictures[]", 10), async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const controller = new ListingController();
  const response = await controller.uploadPictures(req.params.id, req.files);
  return res.send(response);
});

router.get("/active/:id", async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const listingController = new ListingController();
  const {page, per_page} = req.query;
  const listings: any = await listingController.getActiveListings(req.params.id, 
    page ? Number(req.query.page) : 0, per_page ? Number(req.query.per_page) : 10);
  if (!listings) res.status(404).send({ message: "No listings found" });
  return res.send(listings);
});

router.get("/history/:id", async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const listingController = new ListingController();
  const {page, per_page} = req.query;
  const listings: any = await listingController.getHistoryListings(req.params.id, 
    page ? Number(req.query.page) : 0, per_page ? Number(req.query.per_page) : 10);
  if (!listings) res.status(404).send({ message: "No listings found" });
  return res.send(listings);
});

router.get("/search", async (req, res) => {
  try {
    await Joi.object({
      listing: Joi.string(),
      faultCategoryId: Joi.string(),
      cityId: Joi.number(),
      page: Joi.number(),
      per_page: Joi.number(),
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const listingController = new ListingController();
  const { listing, faultCategoryId, cityId, page, per_page } = req.query;
  const listings: any = await listingController.getSearchResults(
    listing ? String(listing) : undefined, faultCategoryId ? String(faultCategoryId) : undefined, cityId ? Number(cityId) : undefined,
    page ? Number(page) : undefined, per_page ? Number(per_page) : undefined
  );
  if (!listings) res.status(404).send({ message: "No listings found" });
  return res.send(listings);
});

export default router;
