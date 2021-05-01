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
  const offer = await offerRepository.findOne({
    where: { id: id },
    relations: ["service", "listing", "listing.person"]
  });
  return !offer ? null : offer;
};

export const getActiveOffers = async (query: IServicePaginatedPayload): Promise<IOfferPaginatedResult> => {
  const offerRepository = getRepository(Offer);
  const take = query.per_page || 10;
  const skip = query.page! * query.per_page! || 0;
  
  const [result, total] = await offerRepository.createQueryBuilder('offer')
    .leftJoinAndSelect('offer.service', 'service')
    .leftJoinAndSelect('service.reviews', 'reviews')
    .leftJoinAndSelect('service.user', 'serviceUser')
    .leftJoinAndSelect('serviceUser.profilePicture', 'serviceUserPicture')
    .leftJoinAndSelect('offer.status', 'status')
    .leftJoinAndSelect('offer.listing', 'listing')
    .leftJoinAndSelect('listing.city', 'listingCity')
    .leftJoinAndSelect('listing.faultCategory', 'listingFault')
    .leftJoinAndSelect('listingFault.parent', 'listingFaultParent')
    .leftJoinAndSelect('listing.pictures', 'listingPictures')
    .leftJoinAndSelect('listing.offers', 'offers', 'offers.statusId <> 4 AND offers.serviceId <> :sid', {sid: query.serviceId})
    .leftJoinAndSelect('offers.service', 'offerService')
    .leftJoinAndSelect('offerService.reviews', 'serviceReviews')
    .leftJoinAndSelect('offerService.user', 'offerServiceUser')
    .leftJoinAndSelect('offerServiceUser.profilePicture', 'offerServiceUserPicture')
    .where('service.id = :id AND offer.statusId = 1', {id: query.serviceId})
    .orderBy({ 'offer.updatedAt': "DESC", 'listingPictures.id': 'DESC' })
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

export const getHistoryOffers = async (query: IServicePaginatedPayload): Promise<IOfferPaginatedResult> => {
  const offerRepository = getRepository(Offer);
  const take = query.per_page || 10;
  const skip = query.page! * query.per_page! || 0;
  
  const [result, total] = await offerRepository.createQueryBuilder('offer')
    .leftJoinAndSelect('offer.service', 'service')
    .leftJoinAndSelect('service.reviews', 'reviews')
    .leftJoinAndSelect('service.user', 'serviceUser')
    .leftJoinAndSelect('serviceUser.profilePicture', 'serviceUserPicture')
    .leftJoinAndSelect('offer.status', 'status')
    .leftJoinAndSelect('offer.listing', 'listing')
    .leftJoinAndSelect('listing.city', 'listingCity')
    .leftJoinAndSelect('listing.faultCategory', 'listingFault')
    .leftJoinAndSelect('listingFault.parent', 'listingFaultParent')
    .leftJoinAndSelect('listing.pictures', 'listingPictures')
    .leftJoinAndSelect('listing.offers', 'offers', 'offers.statusId <> 4 AND offers.serviceId <> :sid', {sid: query.serviceId})
    .leftJoinAndSelect('offers.service', 'offerService')
    .leftJoinAndSelect('offerService.reviews', 'serviceReviews')
    .leftJoinAndSelect('offerService.user', 'offerServiceUser')
    .leftJoinAndSelect('offerServiceUser.profilePicture', 'offerServiceUserPicture')
    .where('service.id = :id AND offer.statusId <> 1', {id: query.serviceId})
    .orderBy({ 'offer.updatedAt': "DESC", 'listingPictures.id': 'DESC' })
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

export const acceptOffer = async (id: number): Promise<Offer | null> => {
  const repository = getRepository(Offer);
  const result = await repository.findOne({id: id});
  if (!result) return null;
  result.statusId = 2;
  return repository.save(result);
}

export const declineOffer = async (id: number): Promise<Offer | null> => {
  const repository = getRepository(Offer);
  const result = await repository.findOne({id: id});
  if (!result) return null;
  result.statusId = 3;
  return repository.save(result);
}