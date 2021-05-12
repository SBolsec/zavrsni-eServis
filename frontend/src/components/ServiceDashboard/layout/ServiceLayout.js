import React from 'react'
import { useAuth } from '../../../contexts/AuthContext';
import { ConversationsProvider } from '../../../contexts/ConversationsContext';
import ServiceContextProvider from '../../../contexts/ServiceContext';
import { SocketProvider } from '../../../contexts/SocketContext';
import Footer from '../../Footer';
import {
  ServiceContent,
  ServiceSidebar,
  ServiceHeader
} from './index'

const ServiceLayout = () => {
  const { auth } = useAuth();

  return (
    <SocketProvider id={auth.data.userId}>
      <ConversationsProvider id={auth.data.userId} profilePictureURL={auth.data.profilePictureURL}>
        <ServiceContextProvider>
          <div className="c-app c-default-layout">
            <ServiceSidebar />
            <div className="c-wrapper">
              <ServiceHeader />
              <div className="c-body">
                <ServiceContent />
              </div>
              <Footer />
            </div>
          </div>
        </ServiceContextProvider>
      </ConversationsProvider>
    </SocketProvider>
  )
}

export default ServiceLayout;
