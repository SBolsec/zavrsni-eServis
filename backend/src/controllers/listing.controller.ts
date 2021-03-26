import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Listing } from "../models";
import { createListing, getListing, getListings, IListingPayload } from '../repositories/listing.repository';

@Route("listings")
@Tags("Listing")
export default class ListingController {
  
  @Get("/")
  public async getListings(): Promise<Listing[]> {
    return getListings();
  }

  @Post("/")
  public async createListing(@Body() body: IListingPayload): Promise<Listing> {
    return createListing(body);
  }

  @Get("/:id")
  public async getListing(@Path() id: string): Promise<Listing | null> {
    return getListing(Number(id));
  }
}
