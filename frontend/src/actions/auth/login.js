import axiosInstance from '../../helpers/axiosInstance';
import { LOGIN_LOADING, LOGIN_ERROR, LOGIN_SUCCESS } from '../../constants/actionTypes';
import { PREFIX } from '../../constants/global';

const login = ({ email, password }) => (dispatch) => {
    dispatch({ type: LOGIN_LOADING });

    axiosInstance()
        .post('/login', {
            email,
            password
        })
        .then((res) => {
            localStorage.setItem(PREFIX + 'token', res.data.accessToken);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.user
            });
        })
        .catch((err) => {
            dispatch({
                type: LOGIN_ERROR,
                payload: err.response ? err.response.data.message : "Spajanje na poslužitelj neuspješno"
            });
        });
}

export default login;