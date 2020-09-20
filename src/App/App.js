import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { connect } from "react-redux";
import RetailerView from "../views/RetailerView";
import UserView from "../views/UserView";
import RetailerProfileView from "../views/RetailerProfileView";
import UserProfileView from "../views/UserProfileView";
import { Switch, Route } from "react-router-dom";

import PublicView from "../views/PublicView";

var App = () => {
  const [retailerLoggedIn, setRetailerLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("retailer"));
    if (!loggedInUser) {
      setRetailerLoggedIn(false);
    } else {
      setRetailerLoggedIn(true);
    }
  }, [setRetailerLoggedIn]);

  return (
    <div className={styles.App}>
      {retailerLoggedIn ? (
        <div className={styles.appMobileContainer}>
          <Switch>
            <Route path="/userview" component={UserView} />
            <Route path="/retailerview" component={RetailerView} />
            <Route path="/retailerprofile" component={RetailerProfileView} />
            <Route path="/userprofile" component={UserProfileView} />
          </Switch>
        </div>
      ) : (
        <PublicView setRetailerLoggedIn={setRetailerLoggedIn} />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    retailers: state.retailers,
  };
};

export default connect(mapStateToProps, null)(App);
