import { ROLE_USER, ROLE_SERVICE, ROLE_ADMIN, ROLE_ERROR } from '../constants/global';

export default function getRole(roleId) {
  switch (roleId) {
    case 1: return ROLE_ADMIN;
    case 2: return ROLE_USER;
    case 3: return ROLE_SERVICE;
    default: return ROLE_ERROR;
  }
}