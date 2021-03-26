import express from "express";
import PictureController from "../controllers/picture.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new PictureController();
  const response = await controller.getPictures();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new PictureController();
  const response = await controller.createPicture(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new PictureController();
  const response = await controller.getPicture(req.params.id);
  if (!response) res.status(404).send({ message: "No listing found" });
  return res.send(response);
});

export default router;
