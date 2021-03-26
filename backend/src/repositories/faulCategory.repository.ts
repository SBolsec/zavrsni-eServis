import { getRepository } from "typeorm";
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
