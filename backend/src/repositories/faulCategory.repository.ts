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
  const faultCategory = await faultCategoryRepository.findOne({ 
    where: {
      id: id
    },
    relations: ["parent"]
  });
  return !faultCategory ? null : faultCategory;
};

export const getFaultCategoriesFormatted = async (): Promise<FaultCategory[]> => {
  const repository = getRepository(FaultCategory);

  return await repository.createQueryBuilder('faultCategory')
    .leftJoinAndSelect('faultCategory.parent', 'parent')
    .where("faultCategory.parentId IS NOT NULL AND faultCategory.parentId <> 1")
    .getMany();
};

export const getFaultCategoriesForSearch = async (): Promise<FaultCategory[]> => {
  const repository = getRepository(FaultCategory);

  return await repository.createQueryBuilder('faultCategory')
    .leftJoinAndSelect('faultCategory.parent', 'parent')
    .where("faultCategory.parentId IS NOT NULL")
    .getMany();
}

export const getFaultCategoriesOfService = async (id: number): Promise<FaultCategory[]> => {
  
  
  return [];
}
