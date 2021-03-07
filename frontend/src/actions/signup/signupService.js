import axiosInstance from '../../helpers/axiosInstance';
import { REGISTER_ERROR, REGISTER_SUCCESS, REGISTER_LOADING } from '../../constants/actionTypes';

const signupService = ({ companyName, oib, address, city, phone, email, password }) => (dispatch) => {
    dispatch({ type: REGISTER_LOADING });

    setTimeout(() => {
        axiosInstance().post('/signup/service', {
            companyName, 
            oib, 
            address, 
            city, 
            phone,
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
                    payload: err.response ? err.response.data : "Spajanje na poslužitelj neuspješno"
                 });
                
            })
    }, 2000);
}

export default signupService;