import React from 'react'
import ServiceContextProvider from '../../contexts/ServiceContext';
import Footer from '../Footer';
import {
  ServiceContent,
  ServiceSidebar,
  ServiceHeader
} from './index'

const ServiceLayout = ({ title }) => {
  return (
    <ServiceContextProvider>
      <div className="c-app c-default-layout">
        <ServiceSidebar />
        <div className="c-wrapper">
          <ServiceHeader title={title} />
          <div className="c-body">
            <ServiceContent />
          </div>
          <Footer />
        </div>
      </div>
    </ServiceContextProvider>
  )
}

export default ServiceLayout;
