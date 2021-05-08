import { CREATE_CONVERSATION, ADD_MESSAGE } from '../constants/actionTypes';

const conversationsReducer = (state, { type, payload }) => {
    switch (type) {
        case CREATE_CONVERSATION:
            return [
                ...state,
                payload
            ];
        case ADD_MESSAGE:
            return payload;
        default:
            return state;
    }
}

export default conversationsReducer;