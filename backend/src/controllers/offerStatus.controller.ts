import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { OfferStatus } from "../models";
import { createOfferStatus, getOfferStatus, getOfferStatuses, IOfferStatusPayload } from '../repositories/offerStatus.repository';

@Route("offerStatuses")
@Tags("Offer status")
export default class FaultCategoryController {
  
  @Get("/")
  public async getOfferStatuses(): Promise<OfferStatus[]> {
    return getOfferStatuses();
  }

  @Post("/")
  public async createOfferStatus(@Body() body: IOfferStatusPayload): Promise<OfferStatus> {
    return createOfferStatus(body);
  }

  @Get("/:id")
  public async getOfferStatus(@Path() id: string): Promise<OfferStatus | null> {
    return getOfferStatus(Number(id));
  }
}
