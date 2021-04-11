import { Get, Route, Tags, Post, Body, Path, Put, Delete } from "tsoa";
import { IOfferPayload } from "../interfaces";
import { Offer } from "../models";
import { createOffer, deleteOffer, getOffer, getOffers, updateOffer } from '../repositories/offer.repository';

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

  @Put("/:id")
  public async updateOffer(@Path() id: number, @Body() body: IOfferPayload): Promise<Offer | null> {
    return updateOffer(id, body);
  }

  @Delete("/:id")
  public async deleteOffer(@Path() id: number): Promise<Offer | null> {
    return deleteOffer(id);
  }

  @Get("/:id")
  public async getOffer(@Path() id: string): Promise<Offer | null> {
    return getOffer(Number(id));
  }
}
