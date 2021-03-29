import { getManager, getRepository } from "typeorm";
import { FaultCategory } from "../models";

export interface IFaultCategory {
  name: string;
  parentId: number;
}

export const getFaultCategories = async (): Promise<FaultCategory[]> => {
  const faultCategoryRepository = getRepository(FaultCategory);
  return faultCategoryRepository.find();
};

export const createFaultCategory = async (
  payload: IFaultCategory
): Promise<FaultCategory> => {
  const faultCategoryRepository = getRepository(FaultCategory);
  const faultCategory = new FaultCategory();
  return faultCategoryRepository.save({
    ...faultCategory,
    ...payload,
  });
};

export const getFaultCategory = async (id: number): Promise<FaultCategory | null> => {
  const faultCategoryRepository = getRepository(FaultCategory);
  const faultCategory = await faultCategoryRepository.findOne({ id: id });
  return !faultCategory ? null : faultCategory;
};

export const getFaultCategoriesFormatted = async (): Promise<{ id: number, name: string, parentId: number, parentName: string }[]> => {
  const manager = getManager();
  const rawData: { id: number, name: string, parentId: number, parentName: string }[] = await manager.query(`
    SELECT 
	    a.sif_kategorija_kvara as id, a.naziv_kategorija_kvara as name,
	    b.sif_kategorija_kvara as parentId, b.naziv_kategorija_kvara as parentName
    FROM kategorija_kvara a
    LEFT JOIN kategorija_kvara b ON a.sif_roditelj = b.sif_kategorija_kvara
    WHERE a.sif_roditelj <> 1`
  );
  return rawData;
};
