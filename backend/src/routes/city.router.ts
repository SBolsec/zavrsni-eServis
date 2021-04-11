import express from "express";
import CityController from "../controllers/city.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new CityController();
  const response = await controller.getCities();
  return res.send(response);
});

router.get('/formatted', async (req, res) => {
  const controller = new CityController();
  const response = await controller.getFormattedCities();
  res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new CityController();
  const response = await controller.createCity(req.body);
  return res.send(response);
});

router.get("/id/:id", async (req, res) => {
  const controller = new CityController();
  const response = await controller.getCity(req.params.id);
  if (!response) res.status(404).send({ message: "No city found" });
  return res.send(response);
});

export default router;