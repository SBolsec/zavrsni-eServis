import { ADD_MESSAGE } from "../../constants/actionTypes";

const addMessage = (prevConversations, message, receiver) => (
  dispatch
) => {
  let madeChange = false;
  const newConversations = prevConversations.map((conversation) => {
    if (conversation.receiver.id === receiver.id) {
      madeChange = true;
      return {
        ...conversation,
        messages: [...conversation.messages, message]
      };
    }

    return conversation;
  });

  const conv = madeChange
    ? newConversations
    : [{ receiver: receiver, messages: [message] }, ...prevConversations];

  dispatch({
    type: ADD_MESSAGE,
    payload: {
      conversations: conv,
      updateIndex: !madeChange
    }
  });
};

export default addMessage;
