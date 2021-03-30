import express from "express";
import FaultCategoryController from "../controllers/faultCategory.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new FaultCategoryController();
  const response = await controller.getFaultCategories();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new FaultCategoryController();
  const response = await controller.createFaultCategory(req.body);
  return res.send(response);
});

router.get("/formatted", async (req, res) => {
  const controller = new FaultCategoryController();
  const response = await controller.getFaultCategoriesFormatted();
  res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new FaultCategoryController();
  const response = await controller.getFaultCategory(req.params.id);
  if (!response) res.status(404).send({ message: "No fault category found" });
  return res.send(response);
});

export default router;
