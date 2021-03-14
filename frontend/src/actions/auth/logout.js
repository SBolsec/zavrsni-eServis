import { LOGOUT } from '../../constants/actionTypes';
import { PREFIX } from '../../constants/global';

const logout = (history) => (dispatch) => {
    localStorage.removeItem(PREFIX + 'token');
    localStorage.removeItem(PREFIX + 'auth');
    dispatch({
        type: LOGOUT
    });
    history.push('/');
}

export default logout;