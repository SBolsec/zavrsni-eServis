import { getRepository } from "typeorm";
import { Listing, Picture } from "../models";

export interface IListingPayload {
  personId: number;
  title: string;
  description: string;
  faultCategoryId: number;
  statusId: number;
  pictures: Picture[];
}

export const getListings = async (): Promise<Listing[]> => {
  const listingRepository = getRepository(Listing);
  return listingRepository.find();
};

export const createListing = async (
  payload: IListingPayload
): Promise<Listing> => {
  const listingRepository = getRepository(Listing);
  const listing = new Listing();
  return listingRepository.save({
    ...listing,
    ...payload,
  });
};

export const getListing = async (id: number): Promise<Listing | null> => {
  const listingRepository = getRepository(Listing);
  const listing = await listingRepository.findOne({ id: id });
  return !listing ? null : listing;
};