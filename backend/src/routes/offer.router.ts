import express from "express";
import OfferController from "../controllers/offer.controller";
import Joi from 'joi';
import auth from '../middlewares/isAuth';
import ListingController from "../controllers/listing.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new OfferController();
  const response = await controller.getOffers();
  return res.send(response);
});

router.post("/", auth([1, 3]), async (req, res) => {
  try {
    await Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required(),
      serviceId: Joi.number().required(),
      listingId: Joi.number().required(),
    }).validateAsync(req.body);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const controller = new OfferController();
  const response = await controller.createOffer(req.body);
  return res.send(response);
});

router.put("/:id", auth([1, 3]), async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const controller = new OfferController();
  const response = await controller.updateOffer(Number(req.params.id), req.body);
  if (!response) res.status(404).send({ message: "No offer found" });
  return res.send(response);
});

router.delete("/:id", auth([1, 3]), async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const controller = new OfferController();
  const response = await controller.deleteOffer(Number(req.params.id));
  if (!response) res.status(404).send({ message: "No offer found" });
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const controller = new OfferController();
  const response = await controller.getOffer(req.params.id);
  if (!response) res.status(404).send({ message: "No offer found" });
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

  const controller = new OfferController();
  const { page, per_page } = req.query;
  const response: any = await controller.getActiveOffers(req.params.id,
    page ? Number(req.query.page) : 0, per_page ? Number(req.query.per_page) : 10);
  if (!response) res.status(404).send({ message: "No offer found" });

  // remove sensitive servicer information and add picture if there is none
  response.data.forEach((offer: any) => {
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
  // remove sensitive servicer information and add picture if there is none
  response.data.forEach((offer: any) => {
    offer.listing.offers.forEach((o: any) => {
      o.service.profilePicture = o.service.user.profilePicture;
      if (!o.service.profilePicture) {
        o.service.profilePicture = {
          id: 0,
          name: 'no-picture',
          url: "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png"
        }
      }
      delete o.service.user;
    });
  });

  return res.send(response);
});

router.post("/accept/:id", auth([2]), async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const offerController = new OfferController();
  const offer = await offerController.getOffer(req.params.id);
  if (!offer) return res.status(404).send({ message: "No offer found" });
  if (offer.listing.person.userId !== req.currentUser.id) {
    return res.status(400).send({ message: "Not allowed!" });
  }

  const listingController = new ListingController();
  const listing = await listingController.getListing(offer.listingId.toString());
  for (var o of listing!.offers) {
    if (o.id === offer.id) {
      await offerController.acceptOffer(o.id);
    } else {
      await offerController.declineOffer(o.id);
    }
  }
  listingController.finishListing(listing!.id);

  res.status(204).send();
});

router.post("/decline/:id", auth([2]), async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const offerController = new OfferController();
  const offer = await offerController.getOffer(req.params.id);
  if (!offer) return res.status(404).send({ message: "No offer found" });
  if (offer.listing.person.userId !== req.currentUser.id) {
    return res.status(400).send({ message: "Not allowed!" });
  }
  await offerController.declineOffer(offer.id);

  res.status(204).send();
});

export default router;
