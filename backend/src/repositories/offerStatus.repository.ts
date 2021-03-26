import { getRepository } from "typeorm";
import { OfferStatus } from "../models";

export interface IOfferStatusPayload {
  status: string;
}

export const getListings = async (): Promise<OfferStatus[]> => {
  const offerStatusRepository = getRepository(OfferStatus);
  return offerStatusRepository.find();
};

export const createListing = async (
  payload: IOfferStatusPayload
): Promise<OfferStatus> => {
  const offerStatusRepository = getRepository(OfferStatus);
  const offerStatus = new OfferStatus();
  return offerStatusRepository.save({
    ...offerStatus,
    ...payload,
  });
};

export const getListing = async (id: number): Promise<OfferStatus | null> => {
  const offerStatusRepository = getRepository(OfferStatus);
  const offerStatus = await offerStatusRepository.findOne({ id: id });
  return !offerStatus ? null : offerStatus;
};
