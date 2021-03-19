import React, { Suspense } from 'react'
import { CContainer, CFade } from '@coreui/react'
import Dashboard from './content/Dashboard';
import Profile from './content/Profile';
import Messages from './content/Messages';
import OffersActive from './content/OffersActive';
import OffersHistory from './content/OffersHistory';
import Servicers from './content/Servicers';
import Search from './content/Search';
import { SERVICE_DASHBOARD, SERVICE_MESSAGES, SERVICE_PROFILE, SERVICE_SEARCH, SERVICE_OFFERS_ACTIVE, SERVICE_OFFERS_HISTORY, SERVICE_SERVICERS } from '../../constants/serviceContent';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const ServiceContent = ({ content }) => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <CFade>
            {content === SERVICE_DASHBOARD ? <Dashboard /> : null}
            {content === SERVICE_PROFILE ? <Profile /> : null}
            {content === SERVICE_MESSAGES ? <Messages /> : null}
            {content === SERVICE_SEARCH ? <Search /> : null}
            {content === SERVICE_OFFERS_ACTIVE ? <OffersActive /> : null}
            {content === SERVICE_OFFERS_HISTORY ? <OffersHistory /> : null}
            {content === SERVICE_SERVICERS ? <Servicers /> : null}
          </CFade>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default ServiceContent;
