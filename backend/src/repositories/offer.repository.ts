import { IOfferPayload } from './../interfaces/offerPayload.interface';
import { getRepository } from "typeorm";
import { Offer } from "../models";
import { IOfferPaginatedResult, IServicePaginatedPayload } from '../interfaces';

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

export const getActiveOffers = async (query: IServicePaginatedPayload): Promise<IOfferPaginatedResult> => {
  const offerRepository = getRepository(Offer);
  const take = query.per_page || 10;
  const skip = query.page! * query.per_page! || 0;
  
  const [result, total] = await offerRepository.createQueryBuilder('offer')
    .leftJoinAndSelect('offer.service', 'service')
    .leftJoinAndSelect('service.user', 'serviceUser')
    .leftJoinAndSelect('serviceUser.profilePicture', 'serviceUserPicture')
    .leftJoinAndSelect('offer.status', 'status')
    .leftJoinAndSelect('offer.listing', 'listing')
    .leftJoinAndSelect('listing.city', 'listingCity')
    .leftJoinAndSelect('listing.offers', 'offers', 'offers.statusId <> 4 AND offers.serviceId <> :sid', {sid: query.serviceId})
    .leftJoinAndSelect('offers.service', 'offerService')
    .where('service.id = :id AND offer.statusId = 1', {id: query.serviceId})
    .take(take)
    .skip(skip)
    .getManyAndCount();

  const totalPages = Math.floor(total / take);
  const currentPage = totalPages - Math.floor((total - skip) / take);

  return {
    current_page: currentPage,
    per_page: take,
    total_pages: totalPages+1,
    data: result
  }
}