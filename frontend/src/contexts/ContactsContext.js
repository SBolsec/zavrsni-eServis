import React, { useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import contactsReducer from '../reducers/contactsReducer';
import addContact from '../actions/contacts/addContact';

const ContactsContext = React.createContext()

export function useContacts() {
  return useContext(ContactsContext)
}

export function ContactsProvider({ children }) {
  const [contacts, contactsDispatch] = useLocalStorage('contacts', contactsReducer, []);

  function createContact(id, name) {
    addContact({id, name})(contactsDispatch);
  }

  return (
    <ContactsContext.Provider value={{ contacts, contactsDispatch, createContact }}>
      {children}
    </ContactsContext.Provider>
  );
}
