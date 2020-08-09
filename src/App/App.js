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
}

App = connect(mapStateToProps, null)(App)

export default App;
