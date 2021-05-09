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

  const payload = madeChange
    ? newConversations
    : [{ receiver: receiver, messages: [message] }, ...prevConversations];

  dispatch({
    type: ADD_MESSAGE,
    payload
  });
};

export default addMessage;
