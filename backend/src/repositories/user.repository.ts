import { getRepository } from 'typeorm';
import { User } from '../models';

export interface IUserPayload {
  email: string;
  password: string;
  roleId: number;
}

export const getUsers = async (): Promise<User[]> => {
  const userRepository = getRepository(User);
  return userRepository.find();
};

export const createUser = async (payload: IUserPayload): Promise<User> => {
  const userRepository = getRepository(User);
  const user = new User();
  return userRepository.save({
    ...user,
    ...payload
  });
}

export const updateUser = async (user: User): Promise<User> => {
  const userRepository = getRepository(User);
  const toBeUpdated = await userRepository.findOne({id: user.id});
  return userRepository.save({
    ...toBeUpdated,
    ...user
  });
}

export const getUserById = async (id: number): Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ id: id });
  return !user ? null : user;
}

export const getUserByEmail = async (email: string): Promise<User | null> => {
  const userRepository = getRepository(User);
  const user = await userRepository.findOne({ email: email });
  return !user ? null : user;
}