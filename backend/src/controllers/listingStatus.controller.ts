import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { ListingStatus } from "../models";
import { createListingStatus, getListingStatus, getListingStatuses, IListingStatusPayload, } from '../repositories/listingStatus.repository';

@Route("listingStatuses")
@Tags("Listing status")
export default class ListingStatusController {
  
  @Get("/")
  public async getListingStatuses(): Promise<ListingStatus[]> {
    return getListingStatuses();
  }

  @Post("/")
  public async createListingStatus(@Body() body: IListingStatusPayload): Promise<ListingStatus> {
    return createListingStatus(body);
  }

  @Get("/:id")
  public async getListingStatus(@Path() id: string): Promise<ListingStatus | null> {
    return getListingStatus(Number(id));
  }
}
