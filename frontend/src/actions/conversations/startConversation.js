import { CREATE_CONVERSATION, CHANGE_SELECTED_CONVERSATION_INDEX } from '../../constants/actionTypes';

const startConversation = (conversations, contact) => (dispatch) => {
    
    let selectedIndex = null;
    let i = 0;
    for (let conv of conversations) {
        if (conv.receiver.id === contact.id) {
            selectedIndex = i;
            break;
        }
        i++;
    }

    if (selectedIndex !== null) {
        dispatch({
            type: CHANGE_SELECTED_CONVERSATION_INDEX,
            payload: selectedIndex
        });
    } else {
        dispatch({
            type: CREATE_CONVERSATION,
            payload: {
                messages: [],
                receiver: contact
            }
        });
    }
}

export default startConversation;