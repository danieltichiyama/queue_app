import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";

import Dashboard from "../components/Dashboard";
import UserView from "../views/UserView";

class App extends Component {
  render() {
    return (
      <div className="App">
        <UserView></UserView>
        <Dashboard></Dashboard>
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
