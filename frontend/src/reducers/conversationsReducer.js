import { CREATE_CONVERSATION, ADD_MESSAGE, INITIALIZE_CONVERSATIONS, CHANGE_SELECTED_CONVERSATION_INDEX } from '../constants/actionTypes';

const conversationsReducer = (state, { type, payload }) => {
    switch (type) {
        case CREATE_CONVERSATION:
            return {
                ...state,
                conversations: [
                    payload,
                    ...state.conversations
                ],
                selectedIndex: 0
            }
        case INITIALIZE_CONVERSATIONS:
        case ADD_MESSAGE:
            return {
                ...state,
                conversations: payload
            }
        case CHANGE_SELECTED_CONVERSATION_INDEX:
            return {
                ...state,
                selectedIndex: payload
            }
        default:
            return state;
    }
}

export default conversationsReducer;