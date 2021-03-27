import express from "express";
import PictureController from "../controllers/picture.controller";
import UserController from "../controllers/user.controller";
import auth from "../middlewares/isAuth";
import { upload } from "../middlewares/upload";
import cloudinary from '../config/cloudinary';
import { IPicturePayload } from "../repositories/picture.repository";

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

router.post("/upload-picture/:id", upload.single('picture'), async (req, res) => {
  const userId = req.params.id;
  const file = req.file;

  const pictureController = new PictureController();
  const userController = new UserController();

  try {
    let image = await cloudinary.uploader.upload(file.path);

    const picture: IPicturePayload = {
      name: image.original_filename,
      cloudinaryId: image.public_id,
      url: image.secure_url
    }

    const result = await pictureController.createPicture(picture);

    const user = await userController.getUserById(userId);
    user!.profilePictureId = result.id;
    await userController.updateUser(user!);

    res.send({
      url: result.url
    });
  } catch (e) {
    res.status(400).send('Upload failed');
  }
});

export default router;
