import { getManager, getRepository } from "typeorm";
import { Listing, Picture } from "../models";

export interface IListingPayload {
  personId: number;
  title: string;
  description: string;
  faultCategoryId: number;
  cityId: number,
  statusId: number;
  pictures?: Picture[];
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

export const getListing = async (id: number): Promise<Listing|null> => {
  const listingRepository = getRepository(Listing);
  const listing = await listingRepository.findOne({ 
    where: { id: id },
    relations: ["offers", "offers.status", "city", "faultCategory", "faultCategory.parent", "status", "pictures", "person", "person.user", "person.user.profilePicture"]
  });
  return !listing ? null : listing;
};

export const getActiveListings = async (id: number): Promise<Listing[]> => {
  const listingRepository = getRepository(Listing);
  return listingRepository.find({
    where: { personId: id, statusId: 1 },
    relations: ["offers", "offers.status", "city", "faultCategory", "faultCategory.parent", "status", "pictures"]
    
  });
}