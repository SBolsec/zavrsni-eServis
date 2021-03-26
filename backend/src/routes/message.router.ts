import express from "express";
import MessageController from "../controllers/message.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new MessageController();
  const response = await controller.getMessages();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new MessageController();
  const response = await controller.createMessage(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new MessageController();
  const response = await controller.getMessage(req.params.id);
  if (!response) res.status(404).send({ message: "No message found" });
  return res.send(response);
});

export default router;
