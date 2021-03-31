import React, { Suspense } from "react";
import { CFade } from "@coreui/react";
import Dashboard from "../content/Dashboard";
import Profile from "../content/Profile";
import Messages from "../content/Messages";
import ListingsActive from "../content/ListingsActive";
import ListingsHistory from "../content/ListingsHistory";
import Servicers from "../content/Servicers";
import { Redirect, Route, Switch } from "react-router-dom";
import Search from "../content/Search";
import CreateListing from "../content/CreateListing";
import ListingDetails from "../content/ListingDetails";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const UserContent = () => {
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
            <Route path="/user/search" component={Search} />
            <Route path="/user/listing/:id" component={ListingDetails} />
            <Redirect to="/404" />
          </Switch>
        </CFade>
      </Suspense>
    </main>
  );
};

export default UserContent;
