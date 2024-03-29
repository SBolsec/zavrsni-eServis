import { getRepository } from 'typeorm';
import { Person } from '../models';

export interface IPersonPayload {
  firstName: string;
  lastName: string;
  userId: number;
}

export const getPeople = async (): Promise<Person[]> => {
  const personRepository = getRepository(Person);
  return personRepository.find();
};

export const createPerson = async (payload: IPersonPayload): Promise<Person> => {
  const personRepository = getRepository(Person);
  const person = new Person();
  return personRepository.save({
    ...person,
    ...payload
  });
}

export const updatePerson = async (id: number, payload: IPersonPayload): Promise<Person | null> => {
  const personRepository = getRepository(Person);
  const person = await personRepository.findOne({id: id});
  if (!person) return null;
  return personRepository.save({
    ...person,
    ...payload
  });
}

export const getPerson = async (id: number): Promise<Person | null> => {
  const personRepository = getRepository(Person);
  const person = await personRepository.findOne({ id: id });
  return !person ? null : person;
}

export const getPersonByUserId = async (id: number): Promise<Person | null> => {
  const personRepository = getRepository(Person);
  const person = await personRepository.findOne({
    where: {userId: id},
    relations: ["user", "user.profilePicture"]
  });
  return !person ? null : person;
}