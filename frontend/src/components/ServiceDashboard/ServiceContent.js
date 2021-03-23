import React, { Suspense } from 'react'
import { CContainer, CFade } from '@coreui/react'
import Dashboard from './content/Dashboard';
import Profile from './content/Profile';
import Messages from './content/Messages';
import OffersActive from './content/OffersActive';
import OffersHistory from './content/OffersHistory';
import Servicers from './content/Servicers';
import Search from './content/Search';
import { Switch, Route, Redirect } from 'react-router-dom';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const ServiceContent = () => {
  return (
    <main className="c-main bg-lightGray p-0 m-0">
      <CContainer fluid>
        <Suspense fallback={loading}>
          <CFade>
            <Switch>
              <Route exact path="/service/dashboard" component={Dashboard} />
              <Route exact path="/service/profile" component={Profile} />
              <Route exact path="/service/messages" component={Messages} />
              <Route exact path="/service/active" component={OffersActive} />
              <Route exact path="/service/history" component={OffersHistory} />
              <Route exact path="/service/servicers" component={Servicers} />
              <Route exact path="/service/search" component={Search} />
              <Redirect to="/404" />
            </Switch>
          </CFade>
        </Suspense>
      </CContainer>
    </main>
  )
}

export default ServiceContent;
