<<<<<<< HEAD
import React from "react";
import "./App.css";

import Dashboard from "../components/Dashboard";
import UserView from "../views/UserView";

function App() {
  return (
    <div className="App">
      <UserView></UserView>
    </div>
  );
=======
import React, { Component } from 'react';
import { connect } from 'react-redux'
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App" >
        <header className="App-header">
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    )
  };
}

const mapStateToProps = state => {
  return {
    retailers: state.retailers,
  }
>>>>>>> fc5359c32ff1e74258a1812f5e647472cf350467
}

App = connect(mapStateToProps, null)(App)

export default App;
