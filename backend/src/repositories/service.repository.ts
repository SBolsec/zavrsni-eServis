import { getRepository } from 'typeorm';
import { IServicePaginatedResult, IServiceSearchPayload } from '../interfaces';
import { Service } from '../models';

export interface IServicePayload {
  name: string;
  oib: string;
  phone: string;
  address: string;
  cityId: number;
  userId: number;
  website?: string;
  description?: string;
}

export const getServices = async (): Promise<Service[]> => {
  const serviceRepository = getRepository(Service);
  return serviceRepository.find();
};

export const createService = async (payload: IServicePayload): Promise<Service> => {
  const serviceRepository = getRepository(Service);
  const service = new Service();
  return serviceRepository.save({
    ...service,
    ...payload
  });
}

export const getService = async (id: number): Promise<Service | null> => {
  const serviceRepository = getRepository(Service);
  const service = await serviceRepository.findOne({
    where: {
      id: id
    },
    relations: [
      "city",
      "user",
      "user.profilePicture",
      "reviews",
      "faultCategories",
      "faultCategories.parent",
      "offers",
      "offers.service",
      "offers.service.reviews",
      "offers.service.user",
      "offers.service.user.profilePicture",
      "offers.status",
      "offers.listing"
    ]
  });
  return !service ? null : service;
}

export const updateService = async (id: number, payload: IServicePayload): Promise<Service | null> => {
  const serviceRepository = getRepository(Service);
  const service = await serviceRepository.findOne({ id: id });
  if (!service) return null;
  return serviceRepository.save({
    ...service,
    ...payload
  });
}

export const getServiceByUserId = async (id: number): Promise<Service | null> => {
  const serviceRepository = getRepository(Service);
  const service = await serviceRepository.findOne({
    where: {
      userId: id
    },
    relations: ["faultCategories", "faultCategories.parent"]
  });
  return !service ? null : service;
}

export const getPaginatedSearchServices = async (query: IServiceSearchPayload): Promise<IServicePaginatedResult> => {
  const serviceRepository = getRepository(Service);
  const take = query.per_page || 10;
  const skip = query.page! * take || 0;

  let whereString: string = "";
  let whereData: any = {};
  let somethingAdded: boolean = false;
  if (query.service) {
    whereString += ` (LOWER(service.name) LIKE '%${query.service}%' OR LOWER(service.description) LIKE '%${query.service}%') `;
    // where.title = Raw(alias => `LOWER(${alias}) Like '%${query.listing}%'`);
    somethingAdded = true;
  }
  if (query.cityId) {
    let cityString = ` service.cityId = :cityId `;
    whereString += somethingAdded ? (' AND ' + cityString) : cityString;
    whereData.cityId = query.cityId;
    somethingAdded = true;
  }
  if (query.faultCategoryId?.length !== 0) {
    let categString = ` faultCategories.id IN (:...fcid) `;
    whereString += somethingAdded ? (' AND ' + categString) : categString;
    whereData.fcid = query.faultCategoryId;
    // somethingAdded = true;
  }

  const [temp, total] = await serviceRepository.createQueryBuilder('service')
    .leftJoinAndSelect('service.city', 'city')
    .leftJoinAndSelect('service.user', 'user')
    .leftJoinAndSelect('user.profilePicture', 'profilePicture')
    .leftJoinAndSelect('service.faultCategories', 'faultCategories')
    .leftJoinAndSelect('faultCategories.parent', 'parentFaultCategory')
    .leftJoinAndSelect('service.reviews', 'reviews')
    .where(whereString, whereData)
    .orderBy({ 'service.updatedAt': "DESC" })
    .take(take)
    .skip(skip)
    .getManyAndCount();

  const result = await serviceRepository.createQueryBuilder('service')
    .leftJoinAndSelect('service.city', 'city')
    .leftJoinAndSelect('service.user', 'user')
    .leftJoinAndSelect('user.profilePicture', 'profilePicture')
    .leftJoinAndSelect('service.faultCategories', 'faultCategories')
    .leftJoinAndSelect('faultCategories.parent', 'parentFaultCategory')
    .leftJoinAndSelect('service.reviews', 'reviews')
    .where("service.id IN (:...ids)", { ids: temp.map(s => s.id)})
    .orderBy({ 'service.updatedAt': "DESC", 'service.id': "ASC" })
    .getMany();

  const totalPages = Math.floor(total / take);
  const currentPage = totalPages - Math.floor((total - skip) / take);

  return {
    current_page: currentPage,
    per_page: take,
    total_pages: totalPages,
    data: result
  }
}