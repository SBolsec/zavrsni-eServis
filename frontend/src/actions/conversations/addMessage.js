import { ADD_MESSAGE } from "../../constants/actionTypes";

const addMessage = (prevConversations, recipients, text, sender) => (
  dispatch
) => {
  console.log('action', prevConversations, recipients, text, sender);

  let madeChange = false;
  const newMessage = { sender, text };
  const newConversations = prevConversations.map((conversation) => {
    if (arrayEquality(conversation.recipients, recipients)) {
      madeChange = true;
      return {
        ...conversation,
        messages: [...conversation.messages, newMessage]
      };
    }

    return conversation;
  });

  console.log('new', newConversations);

  const payload = madeChange
    ? newConversations
    : [...prevConversations, { recipients, messages: [newMessage] }];

  dispatch({
    type: ADD_MESSAGE,
    payload
  });
};

function arrayEquality(a, b) {
  if (a.length !== b.length) return false;

  a.sort();
  b.sort();

  return a.every((element, index) => element === b[index]);
}

export default addMessage;
