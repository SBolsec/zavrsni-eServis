import express from "express";
import LoginRouter from "./login.router";
import SignupRouter from "./signup.router";
import TokenRouter from "./token.router";
import UserRouter from "./user.router";
import RoleRouter from "./role.router";
import CityRouter from "./city.router";
import PersonRouter from "./person.router";
import ServiceRouter from "./service.router";
import ListingRouter from "./listing.router";
import PictureRouter from "./picture.router";
import FaultCategoryRouter from "./faultCategory.router";
import ListingStatusRouter from "./listingStatus.router";
import MessageRouter from "./message.router";
import OfferRouter from "./offer.router";
import OfferStatusRouter from "./offerStatus.router";
import ReviewRouter from "./review.router";

import auth from '../middlewares/isAuth';
import UserController from '../controllers/user.controller';

const router = express.Router();

router.get('/', async (req, res) => {
  res.redirect(process.env.FRONTEND_URL!);
});

router.get('/test', async (req, res) => {
  console.log(process.env);
  res.send();
});

router.use("/login", LoginRouter);
router.use("/signup", SignupRouter);
router.use("/token", TokenRouter);
router.use("/users", UserRouter);
router.use("/roles", RoleRouter);
router.use("/cities", CityRouter);
router.use("/people", PersonRouter);
router.use("/services", ServiceRouter);
router.use("/listings", ListingRouter);
router.use("/pictures", PictureRouter);
router.use("/faultCategories", FaultCategoryRouter);
router.use("/listingStatuses", ListingStatusRouter);
router.use("/messages", MessageRouter);
router.use("/offers", OfferRouter);
router.use("/offerStatuses", OfferStatusRouter);
router.use("/reviews", ReviewRouter);

export default router;