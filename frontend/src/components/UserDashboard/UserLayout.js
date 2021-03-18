import React from 'react'
import { useState } from 'react';
import Footer from '../Footer';
import {
  UserContent,
  UserSidebar,
  UserHeader
} from './index'

const UserLayout = ({content}) => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="c-app c-default-layout">
      <UserSidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      <div className="c-wrapper">
        <UserHeader showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <div className="c-body">
          <UserContent content={content} />
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default UserLayout;
