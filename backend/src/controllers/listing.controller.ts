import { Get, Route, Tags, Post, Body, Path, Query } from "tsoa";
import cloudinary from "../config/cloudinary";
import { IListingPaginatedResult } from "../interfaces";
import { Listing, Picture } from "../models";
import { createListing, getListing, getListings, getActiveListings, IListingPayload, 
  getPaginatedSearchListings, finishListing, getHistoryListings, getMostRecentListings } from '../repositories/listing.repository';
import { IPicturePayload } from "../repositories/picture.repository";
import PictureController from "./picture.controller";
import ServiceController from './service.controller';

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

  @Get("/history/:id")
  public async getHistoryListings(@Path() id: string, @Query() page?: number, @Query() per_page?: number): Promise<IListingPaginatedResult> {
    return getHistoryListings({personId: Number(id), page, per_page});
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
    @Query() faultCategoryId?: string,
    @Query() cityId?: number,
    @Query() page?: number,
    @Query() per_page?: number): Promise<IListingPaginatedResult> {

    let ids: number[] = [];
    if (faultCategoryId) {
      faultCategoryId.split(":").forEach(id => ids.push(Number(id)));
    }

    return getPaginatedSearchListings({
      listing,
      faultCategoryId: ids,
      cityId,
      page,
      per_page
    });
  }

  @Post("/finish/:id")
  public async finishListing(id: number): Promise<Listing | null> {
    return finishListing(id);
  }

  async getMostRecentListings(take: number) {
    let listings: any = await getMostRecentListings(take);

    // remove sensitive data
    listings.forEach((listing: any) => {
      listing.person.profilePicture = listing.person.user.profilePicture;
      delete listing.person.user;
      if (!listing.person.profilePicture) {
        listing.person.profilePicture = {
          url:
            "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
        };
      }
    });

    return listings;
  }

  public async getListingRecomendations(serviceId: number) {
    const NUMBER_OF_NEW_LISTINGS = 50;
    const NUMBER_OF_LISTING_TO_RETURN = 6;

    const servciceController = new ServiceController();
    const service = await servciceController.getService(serviceId.toString());
    const listings = await this.getMostRecentListings(NUMBER_OF_NEW_LISTINGS);

    let faultCategories: number[] = service.faultCategories.map((f: any) => f.id);
    let parentCategories: number[] = service.faultCategories.map((f: any) => f.parentId);
    let reviewAuthors: number[] = service.reviews.map((r: any) => r.authorId);

    // prepare dates
    const currentDate = new Date();
    const weekAgoDate = new Date();
    weekAgoDate.setDate(currentDate.getDate() - 7);

    // key=listingId, value=score
    let scores: Map<number, number> = new Map();
    listings.forEach((listing: any) => {
      let score: number = 0;
      if (faultCategories.includes(listing.faultCategoryId)) {
        score += 10;
      }
      if (faultCategories.includes(listing.faultCategory.parentId)) {
        score += 3;
      }
      if (parentCategories.includes(listing.faultCategoryId)) {
        score += 3;
      }
      if (listing.cityId === service.cityId) {
        score += 7;
      }
      if (listing.updatedAt.getDate() === currentDate.getDate()) {
        score += 5;
      }
      if (listing.updatedAt.getDate() > weekAgoDate.getDate()) {
        score += 2;
      }
      if (reviewAuthors.includes(listing.personId)) {
        let review = service.reviews.filter((r: any) => r.authorId === listing.personId)[0];
        switch (review.score) {
          case 5: score += 2; break;
          case 4: score += 1; break;
          case 3: break;
          case 2: score -= 1; break;
          default: score -= 2; break;
        }
      }
      scores.set(Number(listing.id), score);
    });

    // sort map by values
    scores[Symbol.iterator] = function* () {
      yield* [...this.entries()].sort((a, b) => b[1] - a[1]);
    }

    let results: any[] = [];
    let count: number = 0;
    for (let [key, _value] of scores) {
      if (count === NUMBER_OF_LISTING_TO_RETURN) break;
      results.push(listings.filter((l: any) => l.id === key)[0]);
      count++;
    }

    return results;
  }
}
