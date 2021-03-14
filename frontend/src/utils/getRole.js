import { ROLE_USER, ROLE_SERVICE, ROLE_ADMIN, ROLE_ERROR } from '../constants/global';

export default function getRole(role) {
  switch (role) {
    case 'obican': return ROLE_USER;
    case 'serviser': return ROLE_SERVICE;
    case 'admin': return ROLE_ADMIN;
    default: return ROLE_ERROR;
  }
}