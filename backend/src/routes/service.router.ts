import { compare, hash } from "bcryptjs";
import express from "express";
import CityController from "../controllers/city.controller";
import ServiceController from "../controllers/service.controller";
import UserController from "../controllers/user.controller";
import { IServicePayload } from "../repositories/service.repository";
import Joi from 'joi';
import auth from '../middlewares/isAuth';
import { userToUserInfo } from "../mappers/userInfo.mapper";
import FaultCategoryController from '../controllers/faultCategory.controller';
import { FaultCategory, Service } from "../models";
import { getRepository } from "typeorm";
import OfferController from "../controllers/offer.controller";
import ReviewController from "../controllers/review.controller";
import ListingController from "../controllers/listing.controller";

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    await Joi.object({
      service: Joi.string(),
      faultCategoryId: Joi.string(),
      cityId: Joi.number(),
      page: Joi.number(),
      per_page: Joi.number(),
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const serviceController = new ServiceController();
  const { service, faultCategoryId, cityId, page, per_page } = req.query;
  const services: any = await serviceController.getSearchResults(
    service ? String(service) : undefined, faultCategoryId ? String(faultCategoryId) : undefined, cityId ? Number(cityId) : undefined,
    page ? Number(page) : undefined, per_page ? Number(per_page) : undefined
  );
  if (!services) res.status(404).send({ message: "No services found" });
  return res.send(services);
});

router.get("/", auth([1, 2, 3]), async (_req, res) => {
  const controller = new ServiceController();
  const response = await controller.getServices();
  return res.send(response);
});

router.post("/", auth([1, 2, 3]), async (req, res) => {
  const controller = new ServiceController();
  const response = await controller.createService(req.body);
  return res.send(response);
});

router.get("/id/:id", async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message});
  }

  const controller = new ServiceController();
  const response = await controller.getService(req.params.id);
  if (!response) res.status(404).send({ message: "No service found" });
  return res.send(response);
});

router.get("/data/:id/", auth([1, 3]), async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message});
  }

  const offerController = new OfferController();
  const offers = await offerController.getNewestOffersByServiceId(Number(req.params.id), 6);
  const pie = await offerController.getNumberOfOffersByStatusFromService(Number(req.params.id));

  const reviewController = new ReviewController();
  const reviews = await reviewController.getMostRecentReviewsOfService(Number(req.params.id), 5);
  
  const listingController = new ListingController();
  const recomendations = await listingController.getListingRecomendations(Number(req.params.id));

  return res.send({
    offers,
    pie,
    reviews,
    recomendations
  });
});

router.get("/user/:id", auth([1, 3]), async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message});
  }
  
  const controller = new ServiceController();
  const response = await controller.getServiceByUserId(req.params.id);
  if (!response) res.status(404).send({ message: "No service found" });
  const cityConttroller = new CityController();
  const city = await cityConttroller.getCity(response!.cityId.toString());
  return res.send({
    ...response,
    cityName: city!.postalCode + " " + city!.name
  });
});

router.put("/:id", auth([1, 3]), async (req, res) => {
  // provjera unesenih podataka
  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    oib: Joi.string().pattern(new RegExp('[0-9]{11,11}')).required(),
    phone: Joi.string().pattern(new RegExp('[0-9+-]{6,15}')).required(),
    website: Joi.string().allow('').allow(null),
    description: Joi.string().allow('').allow(null),
    address: Joi.string().min(1).required(),
    cityId: Joi.number().required(),
    email: Joi.string().email().required(),
    currentPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).allow(''),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).allow(''),
    repeatPassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).allow(''),
    userId: Joi.number().required()
  });

  try {
    await schema.validateAsync(req.body);
  }
  catch (err) {
    return res.status(400).json({
      message: "Neki od podataka je neispravan"
    });
  }

  // azuriranje login podataka
  const userController = new UserController();
  const user = await userController.getUserById(req.body.userId);
  if (!user) res.status(400).send({ message: "Nije pronađen korisnik" });
  const checkEmail = await userController.getUserByEmail(req.body.email);
  if (checkEmail) {
    if (user!.id !== checkEmail.id) {
      return res.status(400).json({
        message: "E-mail je već zauzet"
      });
    }
  }
  user!.email = req.body.email;
  if (!!req.body.password && !!req.body.currentPassword && !!req.body.repeatPassword) {
    // provjera lozinke
    const match = await compare(req.body.password, user!.password);

    if (!match || req.body.password !== req.body.repeatPassword) {
      return res.status(400).json({
        message: "Pogrešna lozinka"
      });
    }

    if (req.body.password === req.body.repeatPassword) {
      user!.password = await hash(req.body.password, 10);
    }
  }
  userController.updateUser(user!.id, user!);

  // azuriranje podataka servisera
  const serviceController = new ServiceController();
  const servicePayload: IServicePayload = {
    name: req.body.name,
    address: req.body.address,
    cityId: req.body.cityId,
    oib: req.body.oib,
    phone: req.body.phone,
    userId: req.body.userId,
    website: req.body.website,
    description: req.body.description
  };
  const service = await serviceController.updateService(
    req.params.id,
    servicePayload
  );
  if (!service) res.status(404).send({ message: "Nije pronađen serviser" });

  const userInfo = await userToUserInfo(user!);

  return res.send({
    user: userInfo,
    service
  });
});

router.post("/setFaultCategories", auth([3]), async (req, res) => {
  // provjera unesenih podataka
  const schema = Joi.object({
    faultCategories: Joi.array().required()
  });

  try {
    await schema.validateAsync(req.body);
  }
  catch (err) {
    return res.status(400).json({
      message: "Neki od podataka je neispravan"
    });
  }
  
  const faultCategories: number[] = req.body.faultCategories;

  const serviceController = new ServiceController();
  const faultCategoryController = new FaultCategoryController();

  const service = await serviceController.getServiceByUserId(req.currentUser.id.toString());

  const categories:FaultCategory[] = [];
  for (let c of faultCategories) {
    const f = await faultCategoryController.getFaultCategory(c.toString());
    categories.push(f!);
  }

  service!.faultCategories = categories;
  const serviceRepository = getRepository(Service);
  serviceRepository.save(service!);

  res.json({
    faultCategories: categories
  });
});

export default router;