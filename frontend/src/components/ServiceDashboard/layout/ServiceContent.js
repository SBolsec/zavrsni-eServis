import React, { Suspense, useEffect } from "react";
import { CFade } from "@coreui/react";
import Dashboard from "../content/Dashboard";
import Profile from "../content/Profile";
import Messages from "../content/Messages";
import OffersActive from "../content/OffersActive";
import OffersHistory from "../content/OffersHistory";
import ListingSearch from '../../Shared/Listing/ListingSearch';
import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import getUpdatedData from "../../../actions/auth/getUpdatedData";
import ListingDetails from "../../Shared/Listing/ListingDetails";
import ServiceSearch from "../../Shared/Service/ServiceSearch";
import ServiceDetails from "../../Shared/Service/ServiceDetails";
import CreateOffer from "../content/CreateOffer";
import UpdateOffer from "../content/UpdateOffer";
import Chat from "../../Shared/Chat";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

const ServiceContent = () => {
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
            <Route exact path="/service/dashboard" component={Dashboard} />
            <Route exact path="/service/profile" component={Profile} />
            <Route exact path="/service/messages" component={Chat} />
            <Route exact path="/service/active" component={OffersActive} />
            <Route exact path="/service/history" component={OffersHistory} />
            <Route exact path="/service/servicers" component={ServiceSearch} />
            <Route exact path="/service/search" component={ListingSearch} />
            <Route path="/service/listing/:id" component={ListingDetails} />
            <Route path="/service/service/:id" component={ServiceDetails} />
            <Route path="/service/create/:id" component={CreateOffer} />
            <Route path="/service/update-offer/:id" component={UpdateOffer} />
            <Redirect to="/404" />
          </Switch>
        </CFade>
      </Suspense>
    </main>
  );
};

export default ServiceContent;
