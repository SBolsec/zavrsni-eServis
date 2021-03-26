import { getRepository } from 'typeorm';
import { Service } from '../models';

export interface IServicePayload {
  name: string;
  oib: string;
  phone: string;
  address: string;
  cityId: number;
  userId: number;
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
  const service = await serviceRepository.findOne({ id: id });
  return !service ? null : service;
}

export const getServiceByUserId = async (id: number): Promise<Service | null> => {
  const serviceRepository = getRepository(Service);
  const service = await serviceRepository.findOne({ userId: id });
  return !service ? null : service;
}