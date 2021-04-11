import { IOfferPayload } from './../interfaces/offerPayload.interface';
import { getRepository } from "typeorm";
import { Offer } from "../models";

export const getOffers = async (): Promise<Offer[]> => {
  const offerRepository = getRepository(Offer);
  return offerRepository.find();
};

export const createOffer = async (payload: IOfferPayload): Promise<Offer> => {
  const offerRepository = getRepository(Offer);
  const offer = new Offer();
  return offerRepository.save({
    ...offer,
    ...payload,
  });
};

export const updateOffer = async (id: number, payload: IOfferPayload): Promise<Offer | null> => {
  const offerRepository = getRepository(Offer);
  let offer = await offerRepository.findOne({ where: { id: id } });
  if (!offer) return null;
  offer = {
    ...offer,
    ...payload
  }
  return offerRepository.save(offer);
}

export const deleteOffer = async (id: number): Promise<Offer | null> => {
  const offerRepository = getRepository(Offer);
  let offer = await offerRepository.findOne({ where: { id: id } });
  if (!offer) return null;
  offer.statusId = 4;
  return offerRepository.save(offer);
}

export const getOffer = async (id: number): Promise<Offer | null> => {
  const offerRepository = getRepository(Offer);
  const offer = await offerRepository.findOne({ id: id });
  return !offer ? null : offer;
};
