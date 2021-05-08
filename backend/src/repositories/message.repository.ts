import { getRepository } from "typeorm";
import { Message } from "../models";

export interface IMessagePayload {
  content: string;
  senderId: number;
  receiverId: number;
  delivered: boolean;
  read: boolean;
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

export const getUserMessages = async(id: number): Promise<Message[]> => {
  const messageRepository = getRepository(Message);
  return await messageRepository.createQueryBuilder('message')
    .where("message.senderId = :id OR message.receiverId = :id", { id })
    .orderBy({ 'message.createdAt': "DESC", 'message.id': "DESC" })
    .getMany();
}