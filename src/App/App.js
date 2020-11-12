import React, { useEffect } from "react";
import styles from "./App.module.scss";
import { connect } from "react-redux";
import RetailerView from "../views/RetailerView";
import UserView from "../views/UserView";
import RetailerProfileView from "../views/RetailerProfileView";
import UserProfileView from "../views/UserProfileView";
import VerificationView from "../views/VerificationView";
import AuthView from "../views/AuthView";
import IsRetailerView from "../views/IsRetailerView";
import { Switch, Route, Redirect, useHistory } from "react-router-dom";

import { logoutRetailer } from "../actions";

var App = props => {
  const history = useHistory();

  useEffect(() => {
    let isRetailer = localStorage.getItem("isRetailer");
    let retailer = localStorage.getItem("retailer");

    if (!isRetailer && !retailer) {
      history.push({ pathname: "/" });
    } else if (!retailer) {
      history.push({ pathname: "/auth" });
    }
  }, [props, history]);

  return (
    <div className={styles.App}>
      <button
        type="button"
        onClick={() => {
          props.dispatchLogoutRetailer();
        }}
      >
        Logout
      </button>
      <button
        onClick={() => {
          localStorage.removeItem("isUser");
          localStorage.removeItem("isRetailer");
        }}
      >
        Reset Cookies
      </button>

      <div className={styles.appMobileContainer}>
        <Switch>
          <Route path="/userview" component={UserView} />
          <Route path="/retailerprofile" component={RetailerProfileView} />
          <Route path="/userprofile" component={UserProfileView} />
          <Route path="/verify" component={VerificationView} />
          <Route exact path="/">
            {props.isLoggedIn ? <Redirect to="/retailerview" /> : <IsRetailerView />}
          </Route>
          <Route path="/retailerview">
            {props.isLoggedIn ? <RetailerView /> : <Redirect to="/auth" />}
          </Route>
          <Route path="/auth">
            {props.isLoggedIn ? <Redirect to="/retailerview" /> : <AuthView />}
          </Route>
        </Switch>
      </div>
    </div>
  );
};
const mapStateToProps = state => {
  return {
    retailers: state.retailers,
    isLoggedIn: state.isLoggedIn
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchLogoutRetailer: () => {
      dispatch(logoutRetailer());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
