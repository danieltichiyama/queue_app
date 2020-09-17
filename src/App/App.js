import React, { Component } from "react";
import styles from "./App.module.scss";
import { connect } from "react-redux";

import Dashboard from "../components/Dashboard";
import RetailerView from "../views/RetailerView";
import UserView from "../views/UserView";

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <div className={styles.appMobileContainer}>
          {/* <RetailerView></RetailerView>
          <Dashboard></Dashboard> */}
          <UserView />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    retailers: state.retailers,
  };
};

App = connect(mapStateToProps, null)(App);

export default App;
