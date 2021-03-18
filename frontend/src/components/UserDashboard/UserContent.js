import React, { Suspense } from 'react'
import { CContainer, CFade } from '@coreui/react'
import Dashboard from './content/Dashboard';
import Profile from './content/Profile';
import Messages from './content/Messages';
import ListingsActive from './content/ListingsActive';
import ListingsHistory from './content/ListingsHistory';
import Servicers from './content/Servicers';
import { USER_DASHBOARD, USER_LISTINGS_ACTIVE, USER_LISTINGS_HISTORY, USER_MESSAGES, USER_PROFILE, USER_SERVICERS } from '../../constants/userContent';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const UserContent = ({ content }) => {
  return (
    <main className="c-main">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <CFade>
            {content === USER_DASHBOARD ? <Dashboard /> : null}
            {content === USER_PROFILE ? <Profile /> : null}
            {content === USER_MESSAGES ? <Messages /> : null}
            {content === USER_LISTINGS_ACTIVE ? <ListingsActive /> : null}
            {content === USER_LISTINGS_HISTORY ? <ListingsHistory /> : null}
            {content === USER_SERVICERS ? <Servicers /> : null}
          </CFade>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default UserContent;
