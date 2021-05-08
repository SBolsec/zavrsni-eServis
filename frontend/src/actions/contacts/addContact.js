import axiosInstance from '../../helpers/axiosInstance';
import { ADD_CONTACT } from '../../constants/actionTypes';

const addContact = (contact) => (dispatch) => {
    dispatch({
        type: ADD_CONTACT,
        payload: contact
    });
}

export default addContact;