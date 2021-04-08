import React, { Suspense, useEffect } from "react";
import { CFade } from "@coreui/react";
import Dashboard from "../content/Dashboard";
import Profile from "../content/Profile";
import Messages from "../content/Messages";
import ListingsActive from "../content/ListingsActive";
import ListingsHistory from "../content/ListingsHistory";
import Servicers from "../content/Servicers";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import CreateListing from "../content/CreateListing";
import { useAuth } from "../../../contexts/AuthContext";
import getUpdatedData from "../../../actions/auth/getUpdatedData";
import ListingDetails from "../../Shared/ListingDetails";
import ListingSearch from "../../Shared/ListingSearch";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const UserContent = () => {
  // check if user info has changed
  const history = useHistory();
  const { auth, dispatch } = useAuth();
  useEffect(() => {
    getUpdatedData({userId: auth.data.userId})(dispatch);
  }, [history.location]);

  return (
    <main className="c-main bg-lightGray p-0 m-0">
      <Suspense fallback={loading}>
        <CFade>
          <Switch>
            <Route path="/user/dashboard" component={Dashboard} />
            <Route path="/user/messages" component={Messages} />
            <Route path="/user/profile" component={Profile} />
            <Route path="/user/create" component={CreateListing} />
            <Route path="/user/active" component={ListingsActive} />
            <Route path="/user/history" component={ListingsHistory} />
            <Route path="/user/servicers" component={Servicers} />
            <Route path="/user/search" component={ListingSearch} />
            <Route path="/user/listing/:id" component={ListingDetails} />
            <Redirect to="/404" />
          </Switch>
        </CFade>
      </Suspense>
    </main>
  );
};

export default UserContent;