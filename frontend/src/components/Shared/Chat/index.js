import React from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { ContactsProvider } from "../../../contexts/ContactsContext";
import { ConversationsProvider } from "../../../contexts/ConversationsContext";
import { SocketProvider } from "../../../contexts/SocketContext";
import Dashboard from "./Dashboard";

const Chat = () => {
  const { auth } = useAuth();

  return (
    <SocketProvider id={auth.data.userId}>
      <ContactsProvider>
        <ConversationsProvider id={auth.data.userId} profilePictureURL={auth.data.profilePictureURL}>
          <Dashboard />
        </ConversationsProvider>
      </ContactsProvider>
    </SocketProvider>
  );
};

export default Chat;