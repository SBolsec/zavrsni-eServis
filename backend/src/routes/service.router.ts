import { hash } from "bcryptjs";
import express from "express";
import CityController from "../controllers/city.controller";
import PictureController from "../controllers/picture.controller";
import ServiceController from "../controllers/service.controller";
import UserController from "../controllers/user.controller";
import { IServicePayload } from "../repositories/service.repository";
import { ILoginResponse } from "./login.router";
import auth from '../middlewares/isAuth';

const router = express.Router();

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

router.get("/:id", auth([1, 2, 3]), async (req, res) => {
  const controller = new ServiceController();
  const response = await controller.getService(req.params.id);
  if (!response) res.status(404).send({ message: "No service found" });
  return res.send(response);
});

router.get("/user/:id", auth([1, 3]), async (req, res) => {
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
  if (!service) res.status(404).send({ message: "No service found" });

  const userController = new UserController();
  const user = await userController.getUserById(service!.userId.toString());
  if (!!req.body.email) user!.email = req.body.email;
  if (!!req.body.password) {
    user!.password = await hash(req.body.password, 10);
  }
  userController.updateUser(user!.id, user!);

  let profilePictureSet = false;
  let profilePictureURL =
    "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png";
  if (user!.profilePictureId) {
    const pictureController = new PictureController();
    const picture = await pictureController.getPicture(
      user!.profilePictureId.toString()
    );
    profilePictureSet = true;
    profilePictureURL = picture!.url;
  }

  const u: ILoginResponse = {
    email: user!.email,
    id: user!.id,
    profilePictureSet,
    profilePictureURL,
    roleId: user!.roleId,
    tokenVersion: user!.tokenVersion,
  };

  return res.send({
    user: u,
    service
  });
});


export default router;