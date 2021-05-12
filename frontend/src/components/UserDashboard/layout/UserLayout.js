import React from 'react'
import { useAuth } from '../../../contexts/AuthContext';
import { ConversationsProvider } from '../../../contexts/ConversationsContext';
import { SocketProvider } from '../../../contexts/SocketContext';
import UserContextProvider from '../../../contexts/UserContext';
import Footer from '../../Footer';
import {
  UserContent,
  UserSidebar,
  UserHeader
} from './index'

const UserLayout = () => {
  const { auth } = useAuth();

  return (
    <SocketProvider id={auth.data.userId}>
      <ConversationsProvider id={auth.data.userId} profilePictureURL={auth.data.profilePictureURL}>
        <UserContextProvider>
          <div className="c-app c-default-layout">
            <UserSidebar />
            <div className="c-wrapper">
              <UserHeader />
              <div className="c-body">
                <UserContent />
              </div>
              <Footer />
            </div>
          </div>
        </UserContextProvider>
      </ConversationsProvider>
    </SocketProvider>
  )
}

export default UserLayout;
