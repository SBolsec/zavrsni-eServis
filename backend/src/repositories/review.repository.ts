import { getRepository } from "typeorm";
import { Review } from "../models";

export interface IReviewPayload {
  content: string;
  score: number;
  authorId: number;
  serviceId: number;
}

export const getReviews = async (): Promise<Review[]> => {
  const reviewRepository = getRepository(Review);
  return reviewRepository.find();
};

export const createReview = async (
  payload: IReviewPayload
): Promise<Review> => {
  const reviewRepository = getRepository(Review);
  const review = new Review();
  return reviewRepository.save({
    ...review,
    ...payload,
  });
};

export const updateReview = async (id: number, payload: IReviewPayload): Promise<Review> => {
  const reviewRepository = getRepository(Review);
  const review = await reviewRepository.findOne({ where: {id: id} });
  return reviewRepository.save({
    ...review,
    ...payload,
  });
};

export const getReview = async (id: number): Promise<Review | null> => {
  const reviewRepository = getRepository(Review);
  const review = await reviewRepository.findOne({ 
    where: {id: id},
    relations: ["author", "author.user", "author.user.profilePicture"]
  });
  return !review ? null : review;
};

export const getReviewsByAuthorId = async (id: number): Promise<Review[]> => {
  const reviewRepository = getRepository(Review);
  return await reviewRepository.find({ authorId: id });
}

export const deleteReview = async (id: number): Promise<any> => {
  const reviewRepository = getRepository(Review);
  const review = await reviewRepository.findOne({ where: {id: id} });
  if (!review) return null;
  await reviewRepository.remove(review);
}

export const getMostRecentReviewsOfService = async (id: number, take: number): Promise<Review[]> => {
  const reviewRepository = getRepository(Review);
  return reviewRepository.find({
    relations: ["author", "author.user", "author.user.profilePicture"],
    where: {
      serviceId: id
    },
    order: {
      updatedAt: "DESC",
      id: "DESC"
    },
    take: take
  });
}
