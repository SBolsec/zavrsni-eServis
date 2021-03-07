import { LOGOUT } from '../../constants/actionTypes';

const logout = (history) => (dispatch) => {
    localStorage.removeItem('token');
    localStorage.removeItem('auth');
    dispatch({
        type: LOGOUT
    });
    history.push('/');
}

export default logout;