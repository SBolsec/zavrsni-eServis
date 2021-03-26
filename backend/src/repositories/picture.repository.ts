import { getRepository } from "typeorm";
import { Picture } from "../models";

export interface IPicturePayload {
  name: string,
  cloudinaryId: number,
  url: string
}

export const getPictures = async (): Promise<Picture[]> => {
  const pictureRepository = getRepository(Picture);
  return pictureRepository.find();
};

export const createPicture = async (payload: IPicturePayload): Promise<Picture> => {
  const pictureRepository = getRepository(Picture);
  const picture = new Picture();
  return pictureRepository.save({
    ...picture,
    ...payload,
  });
};

export const getPicture = async (id: number): Promise<Picture | null> => {
  const pictureRepository = getRepository(Picture);
  const picture = await pictureRepository.findOne({ id: id });
  return !picture ? null : picture;
};