import React, { useContext, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { useSocket } from './SocketContext';
import conversationsReducer from '../reducers/conversationsReducer';
import createConversation from '../actions/conversations/createConversation';
// import addMessage from '../actions/conversations/addMessage';
import axiosInstance from '../helpers/axiosInstance';
import { INITIALIZE_CONVERSATIONS, CHANGE_SELECTED_CONVERSATION_INDEX, READ_MESSAGES, ADD_MESSAGE } from '../constants/actionTypes';
import conversationsInitialState from './initialStates/conversationsInitialState';

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({ id, profilePictureURL, children }) {
  const [conversationsContext, conversationsContextDispatch] = useLocalStorage('conversations', conversationsReducer, conversationsInitialState)
  const socket = useSocket()

  // fetch messages of user
  useEffect(() => {
    axiosInstance().get(`/messages/user/${id}`)
      .then(res => {
        conversationsContextDispatch({
          type: INITIALIZE_CONVERSATIONS,
          payload: res.data
        });
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  function createConv(receiver) {
    createConversation({ receiver, messages: [] })(conversationsContextDispatch);
  }

  const addMessage = (prevConversations, message, receiver) => {
    if (socket && prevConversations[conversationsContext.selectedIndex].receiver.id === receiver.id) {
      message.read = true;
      socket.emit('read-messages', { messagesToUpdate: [message.id], receiverId: receiver.id, senderId: id });
    }
    
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


    conversationsContextDispatch({
      type: ADD_MESSAGE,
      payload: {
        conversations: conv,
        updateIndex: !madeChange
      }
    });
  };

  const addMessageToConversation = useCallback((message, receiver) => {
    addMessage(conversationsContext.conversations, message, receiver);
  }, [conversationsContext.conversations]);

  useEffect(() => {
    if (socket == null) return;

    socket.on('receive-message', (message, receiver) => {
      addMessageToConversation(message, receiver);
      // readMessages();
    });

    return () => socket.off('receive-message');
  }, [socket, addMessageToConversation]);

  const formattedConversations = conversationsContext.conversations.map((conversation, index) => {
    const selected = index === conversationsContext.selectedIndex;
    return { ...conversation, selected };
  });

  const readMessages = () => {
    let conv = conversationsContext.conversations[conversationsContext.selectedIndex];
    if (conv) {
      let receiverId = conv.receiver.id;
      let messagesToUpdate = [];
      const newConversations = conversationsContext.conversations.map(c => {
        if (c.receiver.id === receiverId) {
          messagesToUpdate = c.messages.filter(m => m.senderId === receiverId && m.read === false);
          c.messages = c.messages.map(m => ({ ...m, read: true }));
        }
        return c;
      });
      messagesToUpdate = messagesToUpdate.map(m => m.id);

      if (socket && messagesToUpdate.length > 0) {
        socket.emit('read-messages', { messagesToUpdate, receiverId, senderId: id });
      }

      conversationsContextDispatch({
        type: READ_MESSAGES,
        payload: newConversations
      });
    }
  }

  // read messages
  useEffect(() => {
    readMessages();
  }, [conversationsContext.selectedIndex]);

  function sendMessage(receiverId, content) {
    const sender = {
      id: id,
      profilePicture: {
        url: profilePictureURL
      }
    }
    socket.emit('send-message', { receiverId, content, sender });

    addMessageToConversation(
      { senderId: id, receiverId, content },
      { id: receiverId }
    );
  }

  const setSelectedIndex = (index) => {
    conversationsContextDispatch({
      type: CHANGE_SELECTED_CONVERSATION_INDEX,
      payload: index
    });
  }

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[conversationsContext.selectedIndex],
    sendMessage,
    selectConversationIndex: setSelectedIndex,
    createConversation: createConv
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}