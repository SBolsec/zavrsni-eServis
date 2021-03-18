import React, { Suspense } from 'react'
import { CContainer, CFade } from '@coreui/react'
import Haja from './Haja';
import HajaTwo from './HajaTwo';
import Dashboard from './Dashboard';

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
            {content === 'Haja' ? <Haja /> : null}
            {content === 'HajaTwo' ? <HajaTwo /> : null}
            {content === 'Dashboard' ? <Dashboard /> : null}
          </CFade>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default UserContent;
