import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Listing } from "../models";
import { createListing, getListing, getListings, getActiveListings, IListingPayload } from '../repositories/listing.repository';

@Route("listings")
@Tags("Listing")
export default class ListingController {
  
  @Get("/")
  public async getListings(): Promise<Listing[]> {
    return getListings();
  }

  @Post("/")
  public async createListing(@Body() body: IListingPayload): Promise<Listing> {
    return createListing({
      description: body.description,
      faultCategoryId: body.faultCategoryId,
      personId: body.personId,
      statusId: body.statusId,
      title: body.title,
      cityId: body.cityId
    });
  }

  @Get("/active/:id")
  public async getActiveListings(@Path() id: string): Promise<any[]> {
    return getActiveListings(Number(id));
  }

  @Get("/:id")
  public async getListing(@Path() id: string): Promise<Listing | null> {
    return getListing(Number(id));
  }
}
