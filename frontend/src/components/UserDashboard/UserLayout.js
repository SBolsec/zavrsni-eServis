import React from 'react'
import UserContextProvider from '../../contexts/UserContext';
import Footer from '../Footer';
import {
  UserContent,
  UserSidebar,
  UserHeader
} from './index'

const UserLayout = () => {
  return (
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
  )
}

export default UserLayout;
