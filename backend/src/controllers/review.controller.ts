import { Get, Route, Tags, Post, Body, Path, Put, Delete } from "tsoa";
import { Review } from "../models";
import { createReview, getReview, getReviews, getReviewsByAuthorId, updateReview, deleteReview, IReviewPayload, getMostRecentReviewsOfService } from '../repositories/review.repository';

@Route("reviews")
@Tags("Review")
export default class ReviewController {
  
  @Get("/")
  public async getReviews(): Promise<Review[]> {
    return getReviews();
  }

  @Post("/")
  public async createReview(@Body() body: IReviewPayload): Promise<Review> {
    return createReview(body);
  }

  @Put("/:id")
  public async updateReview(@Path() id: number, @Body() body: IReviewPayload): Promise<Review> {
    return updateReview(id, body);
  }

  @Get("/id/:id")
  public async getReview(@Path() id: string): Promise<any | null> {
    const review: any = await getReview(Number(id));
    review.author.profilePicture = review.author.user.profilePicture;
    delete review.author.user;
    if (!review.author.profilePicture) {
      review.author.profilePicture = {
        url:
          "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
      };
    }
    return review;
  }

  @Get("/author/:id")
  public async getReviewsByAuthorId(@Path() id: string): Promise<Review[]> {
    return getReviewsByAuthorId(Number(id));
  }

  @Delete("/:id")
  public async deleteReview(@Path() id: string): Promise<any> {
    return deleteReview(Number(id));
  }

  public async getMostRecentReviewsOfService(id: number, take: number): Promise<any> {
    let res: any = await getMostRecentReviewsOfService(id, take);
    res.forEach((review: any) => {
      review.author.profilePicture = review.author.user.profilePicture;
      delete review.author.user;
      if (!review.author.profilePicture) {
        review.author.profilePicture = {
          url:
            "https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png",
        };
      }
    });
    return res;
  }
}
