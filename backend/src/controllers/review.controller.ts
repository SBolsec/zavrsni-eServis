import { Get, Route, Tags, Post, Body, Path } from "tsoa";
import { Review } from "../models";
import { createReview, getReview, getReviews, IReviewPayload } from '../repositories/review.repository';

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

  @Get("/:id")
  public async getReview(@Path() id: string): Promise<Review | null> {
    return getReview(Number(id));
  }
}
