import { ADD_CONTACT } from '../constants/actionTypes';

const contactsReducer = (state, { type, payload }) => {
    switch (type) {
        case ADD_CONTACT:
            return [...state, payload];
        default:
            return state;
    }
}

export default contactsReducer;