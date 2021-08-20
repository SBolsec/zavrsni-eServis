import { LOGOUT } from '../../constants/actionTypes';
import { PREFIX } from '../../constants/global';

const logout = (history) => (dispatch) => {
    localStorage.removeItem(PREFIX + 'token');
    localStorage.removeItem(PREFIX + 'auth');
    localStorage.removeItem(PREFIX + 'user');
    localStorage.removeItem(PREFIX + 'service');
    localStorage.removeItem(PREFIX + 'contacts');
    localStorage.removeItem(PREFIX + 'conversations');
    dispatch({
        type: LOGOUT
    });
    history.push('/');
}

export default logout;