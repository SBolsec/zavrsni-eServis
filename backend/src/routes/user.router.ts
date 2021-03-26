import express from "express";
import UserController from "../controllers/user.controller";
import auth from "../middlewares/isAuth";

const router = express.Router();

router.get("/", auth([1, 2, 3]), async (_req, res) => {
  const controller = new UserController();
  const response = await controller.getUsers();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new UserController();
  const response = await controller.createUser(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new UserController();
  const response = await controller.getUserById(req.params.id);
  if (!response) res.status(404).send({ message: "No user found" });
  return res.send(response);
});

router.get("/email/:email", async (req, res) => {
  const controller = new UserController();
  const response = await controller.getUserByEmail(req.params.email);
  if (!response) res.status(404).send({ message: "No user found" });
  return res.send(response);
});

export default router;
