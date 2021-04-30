import { PREFIX } from '../constants/global';

const isAuthenticated = () => {
    return !!localStorage.getItem(PREFIX + 'token');
}

export default isAuthenticated;