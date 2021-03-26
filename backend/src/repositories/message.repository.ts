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
