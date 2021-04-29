import express from "express";
import FaultCategoryController from "../controllers/faultCategory.controller";
import Joi from 'joi';
import auth from '../middlewares/isAuth';

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new FaultCategoryController();
  const response = await controller.getFaultCategories();
  return res.send(response);
});

router.post("/", auth([1]), async (req, res) => {
  try {
    await Joi.object({
      name: Joi.string().min(1).required(),
      parentId: Joi.number()
    }).validateAsync(req.body);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }
  
  const controller = new FaultCategoryController();
  const response = await controller.createFaultCategory(req.body);
  return res.send(response);
});

router.get("/formatted", async (req, res) => {
  const controller = new FaultCategoryController();
  const response = await controller.getFaultCategoriesFormatted();
  res.send(response);
});

router.get("/search", async (req, res) => {
  const controller = new FaultCategoryController();
  const response = await controller.getFaultCategoriesSearch();
  res.send(response);
});

router.get("/id/:id", async (req, res) => {
  try {
    await Joi.object({
      id: Joi.number().required()
    }).validateAsync(req.params);
  } catch (err) {
    return res.status(400).send({ message: err.details[0].message });
  }
  
  const controller = new FaultCategoryController();
  const response = await controller.getFaultCategory(req.params.id);
  if (!response) res.status(404).send({ message: "No fault category found" });
  return res.send(response);
});

export default router;
