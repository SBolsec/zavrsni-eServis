import { getRepository } from "typeorm";
import { ListingStatus } from "../models";

export interface IListingStatusPayload {
  name: string
}

export const getListingStatuses = async (): Promise<ListingStatus[]> => {
  const listingStatusRepository = getRepository(ListingStatus);
  return listingStatusRepository.find();
};

export const createListingStatus = async (
  payload: IListingStatusPayload
): Promise<ListingStatus> => {
  const listingStatusRepository = getRepository(ListingStatus);
  const listingStatus = new ListingStatus();
  return listingStatusRepository.save({
    ...listingStatus,
    ...payload,
  });
};

export const getListingStatus = async (id: number): Promise<ListingStatus | null> => {
  const listingStatusRepository = getRepository(ListingStatus);
  const listingStatus = await listingStatusRepository.findOne({ id: id });
  return !listingStatus ? null : listingStatus;
};