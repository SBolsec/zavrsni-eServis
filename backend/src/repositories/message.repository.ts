import { getManager, getRepository } from "typeorm";
import { Message } from "../models";

export interface IMessagePayload {
  content: string;
  senderId: number;
  receiverId: number;
  delivered: boolean;
  read: boolean;
}

export interface IContactInfo {
  id: number;
  name: string;
  profilePictureURL?: string;
}

export const getMessages = async (): Promise<Message[]> => {
  const messageRepository = getRepository(Message);
  return messageRepository.find();
};

export const createMessage = async (
  payload: IMessagePayload
): Promise<Message> => {
  const messageRepository = getRepository(Message);
  const message = new Message();
  return messageRepository.save({
    ...message,
    ...payload,
  });
};

export const getMessage = async (id: number): Promise<Message | null> => {
  const messageRepository = getRepository(Message);
  const message = await messageRepository.findOne({ id: id });
  return !message ? null : message;
};

export const getUserMessages = async (id: number): Promise<Message[]> => {
  const messageRepository = getRepository(Message);
  return await messageRepository.createQueryBuilder('message')
    .where("message.senderId = :id OR message.receiverId = :id", { id })
    .orderBy({ 'message.createdAt': "DESC", 'message.id': "DESC" })
    .getMany();
}

export const getContacts = async (id: number, name: string): Promise<IContactInfo[]> => {
  const manager = getManager();
  const result: IContactInfo[] = await manager.query(`SELECT * FROM (
    SELECT 
      osoba.sif_korisnik AS id,
      osoba.ime || ' ' || osoba.prezime AS name,
      slika.url AS profilePictureURL
    FROM osoba
    LEFT JOIN korisnik USING (sif_korisnik)
    LEFT JOIN slika ON (sif_slika_profila = sif_slika)
  UNION
    SELECT
      servis.sif_korisnik AS id,
      servis.naziv_servis AS name,
      slika.url AS profilePictureURL
    FROM servis
    LEFT JOIN korisnik USING (sif_korisnik)
    LEFT JOIN slika ON (sif_slika_profila = sif_slika)
  ) AS t
  WHERE id <> $1 AND LOWER(name) LIKE $2
  ORDER BY name ASC;`, [id, '%'+name+'%']);
  return result;
}