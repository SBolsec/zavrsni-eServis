import express from "express";
import PersonController from "../controllers/person.controller";

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

router.get("/user/:id", async (req, res) => {
  const controller = new PersonController();
  const response = await controller.getPersonByUserId(req.params.id);
  if (!response) res.status(404).send({ message: "No person found" });
  return res.send(response);
});

export default router;