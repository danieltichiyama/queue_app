import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { connect } from "react-redux";
import RetailerView from "../views/RetailerView";
import UserView from "../views/UserView";
import RetailerProfileView from "../views/RetailerProfileView";
import UserProfileView from "../views/UserProfileView";
import AuthView from "../views/AuthView";
import VerificationView from "../views/VerificationView";
import { Switch, Route } from "react-router-dom";

function App(props) {
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
      <div className={styles.appMobileContainer}>
        <Switch>
          <Route path="/userview" component={UserView} />
          <Route
            path="/retailerview"
            component={retailerLoggedIn ? RetailerView : AuthView}
          />
          <Route path="/retailerprofile" component={RetailerProfileView} />
          <Route path="/verification" component={VerificationView} />
          <Route path="/userprofile" component={UserProfileView} />
        </Switch>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    retailers: state.retailers,
  };
};

App = connect(mapStateToProps, null)(App);

export default App;
