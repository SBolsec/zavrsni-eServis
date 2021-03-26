import { getRepository } from "typeorm";
import { Review } from "../models";

export interface IReviewPayload {
  content: string;
  score: number;
  authorId: number;
  serviceId: number;
}

export const getListings = async (): Promise<Review[]> => {
  const reviewRepository = getRepository(Review);
  return reviewRepository.find();
};

export const createListing = async (
  payload: IReviewPayload
): Promise<Review> => {
  const reviewRepository = getRepository(Review);
  const review = new Review();
  return reviewRepository.save({
    ...review,
    ...payload,
  });
};

export const getListing = async (id: number): Promise<Review | null> => {
  const reviewRepository = getRepository(Review);
  const review = await reviewRepository.findOne({ id: id });
  return !review ? null : review;
};
