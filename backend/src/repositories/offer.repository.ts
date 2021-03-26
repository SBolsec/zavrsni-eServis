import { getRepository } from "typeorm";
import { Offer } from "../models";

export interface IOfferPayload {
  title: string;
  description: string;
  price: number;
  serviceId: number;
  statusId: number;
  listingId: number;
}

export const getOffers = async (): Promise<Offer[]> => {
  const offerRepository = getRepository(Offer);
  return offerRepository.find();
};

export const createOffer = async (
  payload: IOfferPayload
): Promise<Offer> => {
  const offerRepository = getRepository(Offer);
  const offer = new Offer();
  return offerRepository.save({
    ...offer,
    ...payload,
  });
};

export const getOffer = async (id: number): Promise<Offer | null> => {
  const offerRepository = getRepository(Offer);
  const offer = await offerRepository.findOne({ id: id });
  return !offer ? null : offer;
};
