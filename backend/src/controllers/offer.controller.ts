import { IOfferPaginatedResult } from './../interfaces/offerPaginatedResult.interface';
import { Get, Route, Tags, Post, Body, Path, Put, Delete, Query } from "tsoa";
import { IOfferPayload } from "../interfaces";
import { Offer } from "../models";
import { createOffer, deleteOffer, getActiveOffers, getOffer, getOffers, updateOffer, acceptOffer, declineOffer } from '../repositories/offer.repository';

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

  @Get("/id/:id")
  public async getOffer(@Path() id: string): Promise<Offer | null> {
    return getOffer(Number(id));
  }

  @Get("/active/:id")
  public async getActiveOffers(@Path() id: string, @Query() page?: number, @Query() per_page?: number): Promise<IOfferPaginatedResult> {
    return getActiveOffers({serviceId: Number(id), page, per_page});
  }

  @Post("/accept/:id")
  public async acceptOffer(@Path() id: number): Promise<Offer | null> {
    return acceptOffer(id);
  }

  @Post("/decline/:id")
  public async declineOffer(@Path() id: number): Promise<Offer | null> {
    return declineOffer(id);
  }
}
