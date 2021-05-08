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

export function ConversationsProvider({ id, children }) {
  const [conversations, conversationsDispatch] = useLocalStorage('conversations', conversationsReducer, [])
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0)
  const { contacts } = useContacts()
  const socket = useSocket()

  function createConv(recipients) {
    createConversation({ recipients, messages: [] })(conversationsDispatch);
  }

  const addMessageToConversation = useCallback(({ recipients, text, sender }) => {
    console.log('context', recipients, text, sender);
    addMessage(conversations, recipients, text, sender)(conversationsDispatch);
  }, [conversations]);

  useEffect(() => {
    if (socket == null) return;

    socket.on('receive-message', addMessageToConversation);

    return () => socket.off('receive-message');
  }, [socket, addMessageToConversation]);

  function sendMessage(recipients, text) {
    socket.emit('send-message', { recipients, text });

    addMessageToConversation({ recipients, text, sender: id });
  }

  const formattedConversations = conversations.map((conversation, index) => {
    const recipients = conversation.recipients.map(recipient => {
      const contact = contacts.find(contact => contact.id === recipient);
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    const messages = conversation.messages.map(message => {
      const contact = contacts.find(contact => contact.id === message.sender);
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;
      return { ...message, senderName: name, fromMe };
    });
    
    const selected = index === selectedConversationIndex;
    return { ...conversation, messages, recipients, selected };
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