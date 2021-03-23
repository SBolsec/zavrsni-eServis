import React, { Suspense } from 'react'
import { CFade } from '@coreui/react'
import Dashboard from './content/Dashboard';
import Profile from './content/Profile';
import Messages from './content/Messages';
import ListingsActive from './content/ListingsActive';
import ListingsHistory from './content/ListingsHistory';
import Servicers from './content/Servicers';
import { Redirect, Route, Switch } from 'react-router-dom';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const UserContent = () => {
  return (
    <main className="c-main bg-lightGray p-0 m-0">
        <Suspense fallback={loading}>
          <CFade>
            <Switch>
              <Route exact path="/user/dashboard" component={Dashboard} />
              <Route exact path="/user/messages" component={Messages} />
              <Route exact path="/user/profile" component={Profile} />
              <Route exact path="/user/active" component={ListingsActive} />
              <Route exact path="/user/history" component={ListingsHistory} />
              <Route exact path="/user/servicers" component={Servicers} />
              <Redirect to="/404" />
            </Switch>
          </CFade>
        </Suspense>
    </main>
  )
}

export default UserContent;
