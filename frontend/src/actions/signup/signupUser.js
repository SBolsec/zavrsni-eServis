import axiosInstance from '../../helpers/axiosInstance';
import { REGISTER_ERROR, REGISTER_SUCCESS, REGISTER_LOADING } from '../../constants/actionTypes';

const signupUser = ({ firstName, lastName, email, password }) => (dispatch) => {
    dispatch({ type: REGISTER_LOADING });

    axiosInstance()
        .post('/signup/user', {
            firstName,
            lastName,
            email,
            password
        })
        .then((res) => {
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch({
                type: REGISTER_ERROR,
                payload: err.response ? err.response.data.message : "Spajanje na poslužitelj neuspješno"
            });
        });
}

export default signupUser;