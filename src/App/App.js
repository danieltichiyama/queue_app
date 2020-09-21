import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { connect } from "react-redux";
import RetailerView from "../views/RetailerView";
import UserView from "../views/UserView";
import RetailerProfileView from "../views/RetailerProfileView";
import UserProfileView from "../views/UserProfileView";
import { Switch, Route, Redirect } from "react-router-dom";

import AuthView from "../views/AuthView";

var App = (props) => {
  const [retailerLoggedIn, setRetailerLoggedIn] = useState(false);

  useEffect(() => {
    let lsRetailer = localStorage.getItem("retailer");

    if (!lsRetailer) {
      setRetailerLoggedIn(false);
    } else {
      setRetailerLoggedIn(true);
    }
  }, [props.isLoggedIn]);

  return (
    <div className={styles.App}>
      <div className={styles.appMobileContainer}>
        <Switch>
          <Route path="/userview" component={UserView} />
          <Route path="/retailerview">
            {!retailerLoggedIn ? <Redirect to="/auth" /> : <RetailerView />}
          </Route>
          <Route path="/retailerprofile" component={RetailerProfileView} />
          <Route path="/userprofile" component={UserProfileView} />
          <Route path="/auth">
            {retailerLoggedIn ? <Redirect to="/retailerview" /> : <AuthView />}
          </Route>
          <Route exact path="/">
            <Redirect to="/retailerview" />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    retailers: state.retailers,
    isLoggedIn: state.isLoggedIn,
  };
};

export default connect(mapStateToProps, null)(App);
