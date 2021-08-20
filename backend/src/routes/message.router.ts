import express from "express";
import MessageController from "../controllers/message.controller";
import Joi from 'joi';
import auth from '../middlewares/isAuth';

const router = express.Router();

router.get("/", auth([1]), async (_req, res) => {
  const controller = new MessageController();
  const response = await controller.getMessages();
  return res.send(response);
});

router.post("/", auth([1, 2, 3]), async (req, res) => {
  try {
    await Joi.object({
      content: Joi.string().required(),
      senderId: Joi.number().required(),
      receiverId: Joi.number().required(),
      delivered: Joi.boolean(),
      read: Joi.boolean()
    }).validateAsync(req.body);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const controller = new MessageController();
  const response = await controller.createMessage(req.body);
  return res.send(response);
});

router.get("/id/:id", auth([1, 2, 3]), async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const controller = new MessageController();
  const response = await controller.getMessage(req.params.id);
  if (!response) res.status(404).send({ message: "No message found" });
  return res.send(response);
});

router.get("/user/:id", auth([1, 2, 3]),  async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  if (Number(req.params.id) !== req.currentUser.id) {
    return res.status(400).json({ message: "You are not authorized to do this" })
  }

  const controller = new MessageController();
  const response = await controller.getUserMessages(req.params.id);
  if (!response) res.status(404).send({ message: "No messages found" });
  return res.send(response);
});

router.get("/contacts", auth([1, 2, 3]), async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required(),
      name: Joi.string()
    }).validateAsync(req.query);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  if (Number(req.query.id) !== req.currentUser.id) {
    return res.status(400).json({ message: "You are not authorized to do this" })
  }

  const controller = new MessageController();
  const response = await controller.getContacts(Number(req.query.id), String(req.query.name));
  if (!response) res.status(404).send({ message: "No messages found" });
  return res.send(response);
});

router.get("/contacts/:id", async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }

  const controller = new MessageController();
  const response = await controller.getContactById(Number(req.params.id));
  if (!response) res.status(404).send({ message: "No contact found" });
  return res.send(response);
});

export default router;
