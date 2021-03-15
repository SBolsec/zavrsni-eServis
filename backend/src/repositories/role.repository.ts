import { getRepository } from 'typeorm';
import { Role } from '../models';

export interface IRolePayload {
  role: string;
}

export const getRoles = async (): Promise<Role[]> => {
  const roleRepository = getRepository(Role);
  return roleRepository.find();
};

export const createRole = async (payload: IRolePayload): Promise<Role> => {
  const roleRepository = getRepository(Role);
  const role = new Role();
  return roleRepository.save({
    ...role,
    ...payload
  });
}

export const getRole = async (id: number): Promise<Role | null> => {
  const roleRepository = getRepository(Role);
  const role = await roleRepository.findOne({ id: id });
  return !role ? null : role;
}