import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { IOfferPayload } from "../interfaces";
import { Offer } from "../models";
import { createOffer, getOffer, getOffers } from '../repositories/offer.repository';

@Route("offers")
@Tags("Offer")
export default class OfferController {
  
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
