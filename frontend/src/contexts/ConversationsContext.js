import React, { useContext, useState, useEffect, useCallback } from 'react'
import useLocalStorage from '../hooks/useLocalStorage';
import { useContacts } from './ContactsContext';
import { useSocket } from './SocketContext';
import conversationsReducer from '../reducers/conversationsReducer';
import createConversation from '../actions/conversations/createConversation';
import addMessage from '../actions/conversations/addMessage';

const ConversationsContext = React.createContext()

export function useConversations() {
  return useContext(ConversationsContext)
}

export function ConversationsProvider({ id, profilePictureURL, children }) {
  const [conversations, conversationsDispatch] = useLocalStorage('conversations', conversationsReducer, [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const { contacts } = useContacts()
  const socket = useSocket()

  function createConv(receiver) {
    createConversation({ receiver, messages: [] })(conversationsDispatch);
  }

  const addMessageToConversation = useCallback((message, receiver) => {
    addMessage(conversations, message, receiver)(conversationsDispatch);
  }, [conversations]);

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

  const formattedConversations = conversations.map((conversation, index) => {
    const selected = index === selectedConversationIndex;
    return { ...conversation, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    sendMessage,
    selectConversationIndex: setSelectedConversationIndex,
    createConversation: createConv
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  )
}