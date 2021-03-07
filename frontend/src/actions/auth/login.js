import axiosInstance from '../../helpers/axiosInstance';
import { LOGIN_LOADING, LOGIN_ERROR, LOGIN_SUCCESS } from '../../constants/actionTypes';

const login = ({ email, password }) => (dispatch) => {
    dispatch({ type: LOGIN_LOADING });

    setTimeout(() => {
        axiosInstance()
        .post('/login', {
            email,
            password
        })
        .then((res) => {
            localStorage.token = res.data.accessToken;
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: LOGIN_ERROR,
                payload: err.response ? err.response.data : "Spajanje na poslužitelj neuspješno"
            });
        })

    }, 2000);
    
}

export default login;