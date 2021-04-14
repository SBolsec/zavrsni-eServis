import { Get, Route, Tags, Post, Body, Path, Query } from "tsoa";
import cloudinary from "../config/cloudinary";
import { IListingPaginatedResult } from "../interfaces";
import { Listing, Picture } from "../models";
import { createListing, getListing, getListings, getActiveListings, IListingPayload, getPaginatedSearchListings, finishListing } from '../repositories/listing.repository';
import { IPicturePayload } from "../repositories/picture.repository";
import PictureController from "./picture.controller";

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
  public async getActiveListings(@Path() id: string, @Query() page?: number, @Query() per_page?: number): Promise<IListingPaginatedResult> {
    return getActiveListings({personId: Number(id), page, per_page});
  }

  @Get("/id/:id")
  public async getListing(@Path() id: string): Promise<Listing | null> {
    return getListing(Number(id));
  }

  @Post("/upload-pictures/:id")
  public async uploadPictures(@Path() id: string, @Body() files: any): Promise<Picture[]> {
    let listingId: number = Number(id);
    const pictureController = new PictureController();
    
    let pictures: Picture[] = [];
    for (let file of files) {
      try {
        let image = await cloudinary.uploader.upload(file.path);

        const picture: IPicturePayload = {
          name: image.original_filename,
          cloudinaryId: image.public_id,
          url: image.secure_url,
          listingId: listingId
        }

        let result = await pictureController.createPicture(picture);
        pictures = [...pictures, result];
      } catch (ignored) { }
    }

    return pictures;
  }

  @Get("/search")
  public async getSearchResults(
    @Query() listing?: string, 
    @Query() faultCategoryId?: number,
    @Query() cityId?: number,
    @Query() page?: number,
    @Query() per_page?: number): Promise<IListingPaginatedResult> {

    return getPaginatedSearchListings({
      listing,
      faultCategoryId,
      cityId,
      page,
      per_page
    });
  }

  @Post("/finish/:id")
  public async finishListing(id: number): Promise<Listing | null> {
    return finishListing(id);
  }
}
