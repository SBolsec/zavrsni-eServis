import React, { useContext, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { useSocket } from './SocketContext';
import conversationsReducer from '../reducers/conversationsReducer';
import createConversation from '../actions/conversations/createConversation';
import addMessage from '../actions/conversations/addMessage';
import axiosInstance from '../helpers/axiosInstance';
import { INITIALIZE_CONVERSATIONS, CHANGE_SELECTED_CONVERSATION_INDEX } from '../constants/actionTypes';
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

  const addMessageToConversation = useCallback((message, receiver) => {
    addMessage(conversationsContext.conversations, message, receiver)(conversationsContextDispatch);
  }, [conversationsContext.conversations]);

  useEffect(() => {
    if (socket == null) return;

    socket.on('receive-message', addMessageToConversation);

    return () => socket.off('receive-message');
  }, [socket, addMessageToConversation]);

  function sendMessage(receiverId, content) {
    const sender = {
      id: id,
      profilePicture: {
        url: profilePictureURL
      }
    }
    socket.emit('send-message', { receiverId, content, sender });

    addMessageToConversation( 
      {senderId: id, receiverId, content},
      {id: receiverId}
    );
  }

  const formattedConversations = conversationsContext.conversations.map((conversation, index) => {
    const selected = index === conversationsContext.selectedIndex;
    return { ...conversation, selected };
  });

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