import express from "express";
import PersonController from "../controllers/person.controller";
import PictureController from "../controllers/picture.controller";
import UserController from "../controllers/user.controller";
import { IPersonPayload } from "../repositories/person.repository";
import { ILoginResponse } from "./login.router";
import { hash } from "bcryptjs";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new PersonController();
  const response = await controller.getPeople();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new PersonController();
  const response = await controller.createPerson(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new PersonController();
  const response = await controller.getPerson(req.params.id);
  if (!response) res.status(404).send({ message: "No person found" });
  return res.send(response);
});

router.put("/:id", async (req, res) => {
  const personController = new PersonController();
  const personPayload: IPersonPayload = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userId: req.body.userId,
  };
  const person = await personController.updatePerson(
    req.params.id,
    personPayload
  );
  if (!person) res.status(404).send({ message: "No person found" });

  const userController = new UserController();
  const user = await userController.getUserById(person!.userId.toString());
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
    person
  });
});

router.get("/user/:id", async (req, res) => {
  const controller = new PersonController();
  const response = await controller.getPersonByUserId(req.params.id);
  if (!response) res.status(404).send({ message: "No person found" });
  return res.send(response);
});

export default router;
