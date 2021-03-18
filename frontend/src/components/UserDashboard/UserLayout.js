import React from 'react'
import UserContextProvider from '../../contexts/UserContext';
import Footer from '../Footer';
import {
  UserContent,
  UserSidebar,
  UserHeader
} from './index'

const UserLayout = ({ content }) => {
  return (
    <UserContextProvider>
      <div className="c-app c-default-layout">
        <UserSidebar />
        <div className="c-wrapper">
          <UserHeader />
          <div className="c-body">
            <UserContent content={content} />
          </div>
          <Footer />
        </div>
      </div>
    </UserContextProvider>
  )
}

export default UserLayout;
