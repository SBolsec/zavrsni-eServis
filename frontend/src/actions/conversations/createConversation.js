import { CREATE_CONVERSATION } from '../../constants/actionTypes';

const createConversation = (conversation) => (dispatch) => {
    dispatch({
        type: CREATE_CONVERSATION,
        payload: conversation
    });
}

export default createConversation;