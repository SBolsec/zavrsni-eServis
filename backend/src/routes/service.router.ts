import express from "express";
import CityController from "../controllers/city.controller";
import ServiceController from "../controllers/service.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new ServiceController();
  const response = await controller.getServices();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new ServiceController();
  const response = await controller.createService(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new ServiceController();
  const response = await controller.getService(req.params.id);
  if (!response) res.status(404).send({ message: "No service found" });
  return res.send(response);
});

router.get("/user/:id", async (req, res) => {
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

export default router;