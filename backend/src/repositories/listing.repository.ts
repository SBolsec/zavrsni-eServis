import { getManager, getRepository } from "typeorm";
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
  const listing = await listingRepository.findOne({ id: id });
  return !listing ? null : listing;
};

export const getActiveListings = async (id: number): Promise<any[]> => {
  const manager = getManager();
  const rawData: any[] = await manager.query(`
    SELECT 
	    o.sif_oglas AS id,
	    o.naslov AS title,
	    o.opis AS description,
	    o.trenutak_stvaranja AS createdAt,
	    o.sif_osoba AS personId,
	    m.postanski_broj || ' ' || m.naziv_mjesto AS city,
	    b.naziv_kategorija_kvara || ' - ' || a.naziv_kategorija_kvara AS category
    FROM oglas o
    LEFT JOIN mjesto m USING (sif_mjesto)
    LEFT JOIN  kategorija_kvara a USING (sif_kategorija_kvara)
    LEFT JOIN kategorija_kvara b ON (a.sif_roditelj = b.sif_kategorija_kvara)
    WHERE o.sif_osoba = ${id} AND o.sif_status = 1
    ORDER BY o.trenutak_promjene DESC`
  );
  return rawData;
}