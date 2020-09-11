import React, { useEffect, useState } from "react";
import styles from "./App.module.scss";
import { connect } from "react-redux";

import Dashboard from "../components/Dashboard";
import RetailerView from "../views/RetailerView";
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
  }, [setRetailerLoggedIn])

  return (
    <div className={styles.App}>
      {
        retailerLoggedIn ?
        <div className={styles.AuthView}>
          <RetailerView></RetailerView>
          <Dashboard></Dashboard>  
        </div> :
        <PublicView
          setRetailerLoggedIn={setRetailerLoggedIn}
        />
      }
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