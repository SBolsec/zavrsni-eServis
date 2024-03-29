import { CREATE_CONVERSATION, ADD_MESSAGE, INITIALIZE_CONVERSATIONS, CHANGE_SELECTED_CONVERSATION_INDEX, READ_MESSAGES, UNSELECT_CONVERSATION } from '../constants/actionTypes';

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
        case READ_MESSAGES:
            return {
                ...state,
                conversations: payload
            }
        case ADD_MESSAGE:
            return {
                ...state,
                conversations: payload.conversations
            }
        case CHANGE_SELECTED_CONVERSATION_INDEX:
            return {
                ...state,
                selectedIndex: payload
            }
        case UNSELECT_CONVERSATION:
            return {
                ...state,
                selectedIndex: undefined
            }
        default:
            return state;
    }
}

export default conversationsReducer;