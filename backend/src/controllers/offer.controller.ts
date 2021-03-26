import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Offer } from "../models";
import { createOffer, getOffer, getOffers, IOfferPayload } from '../repositories/offer.repository';

@Route("offers")
@Tags("Offer")
export default class FaultCategoryController {
  
  @Get("/")
  public async getOffers(): Promise<Offer[]> {
    return getOffers();
  }

  @Post("/")
  public async createOffer(@Body() body: IOfferPayload): Promise<Offer> {
    return createOffer(body);
  }

  @Get("/:id")
  public async getOffer(@Path() id: string): Promise<Offer | null> {
    return getOffer(Number(id));
  }
}
