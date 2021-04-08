import { getRepository, Like, Raw } from "typeorm";
import { IListingSearchPayload, IListingSearchResult } from "../interfaces";
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

export const getListing = async (id: number): Promise<Listing | null> => {
  const listingRepository = getRepository(Listing);
  const listing = await listingRepository.findOne({
    where: { id: id },
    relations: ["offers", "offers.status", "offers.service", "offers.service.user", "offers.service.user.profilePicture", "offers.service.reviews", "city", "faultCategory", "faultCategory.parent", "status", "pictures", "person", "person.user", "person.user.profilePicture"]
  });
  return !listing ? null : listing;
};

export const getActiveListings = async (id: number): Promise<Listing[]> => {
  const listingRepository = getRepository(Listing);
  return listingRepository.find({
    where: { personId: id, statusId: 1 },
    relations: ["offers", "offers.status", "city", "faultCategory", "faultCategory.parent", "status", "pictures"],
    order: { updatedAt: "DESC" }
  });
}

export const getPaginatedSearchListings = async (query: IListingSearchPayload): Promise<IListingSearchResult> => {
  const listingRepository = getRepository(Listing);
  const take = query.per_page || 10;
  const skip = query.page! * query.per_page! || 0;

  let whereString = "listing.statusId = :statusId ";
  let whereData: any = { statusId: 1 }
  if (query.listing) {
    whereString += ` AND LOWER(listing.title) LIKE '%${query.listing}%' `;
    // where.title = Raw(alias => `LOWER(${alias}) Like '%${query.listing}%'`);
  }
  if (query.cityId) {
    whereString += ` AND listing.cityId = :cityId `;
    whereData.cityId = query.cityId;
  }
  if (query.faultCategoryId) {
    whereString += ` AND (faultCategory.id = :fcid OR faultCategory.parentId = :fcid) `;
    whereData.fcid = query.faultCategoryId;
  }

  const [result, total] = await listingRepository.createQueryBuilder('listing')
    .leftJoinAndSelect('listing.offers', 'offer')
    .leftJoinAndSelect('offer.status', 'offerStatus')
    .leftJoinAndSelect('listing.city', 'city')
    .leftJoinAndSelect('listing.faultCategory', 'faultCategory')
    .leftJoinAndSelect('faultCategory.parent', 'faultCategoryParent')
    .leftJoinAndSelect('listing.status', 'listingStatus')
    .leftJoinAndSelect('listing.pictures', 'pictures')
    .where(whereString, whereData)
    .orderBy({ 'listing.updatedAt': "DESC" })
    .take(take)
    .skip(skip)
    .getManyAndCount()

  const nextPage = query.page ? (skip + take > total ? null : query.page + 1) : 1;
  const prevPage = query.page ? (query.page - 1 < 0 ? null : query.page - 1) : null;
  const totalPages = Math.floor(total / take);

  return {
    next_page: nextPage,
    prev_page: prevPage,
    current_page: totalPages - Math.floor((total - skip) / take),
    per_page: take,
    total_pages: totalPages,
    data: result
  }
}