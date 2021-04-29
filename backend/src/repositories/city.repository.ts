import { getRepository, getManager } from "typeorm";
import { City } from "../models";

export interface ICityPayload {
  name: string;
  postalCode: string;
}

export const getCities = async (): Promise<City[]> => {
  const cityRepository = getRepository(City);
  return cityRepository.find();
};

export const getFormattedCities = async (): Promise<{id: number, city: string}[]> => {
  const manager = getManager();
  const rawData: {id: number, city: string}[] = await manager.query(`
    SELECT sif_mjesto AS id, 
      CONCAT(postanski_broj, ' ', naziv_mjesto) AS city
    FROM mjesto
    ORDER BY id`
  );
  return rawData;
}

export const createCity = async (payload: ICityPayload): Promise<City> => {
  const cityRepository = getRepository(City);
  const city = new City();
  return cityRepository.save({
    ...city,
    ...payload,
  });
};

export const getCity = async (id: number): Promise<City | null> => {
  const cityRepository = getRepository(City);
  const city = await cityRepository.findOne({ id: id });
  return !city ? null : city;
};