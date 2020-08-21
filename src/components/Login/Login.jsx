import React, { useState } from 'react';
import styles from "./Login.module.scss";
import { connect } from "react-redux";
import { loginRetailer } from '../../actions';

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginSubmit = (e, loginData) => {
    e.preventDefault();
    props.dispatchLoginSubmit(loginData);
  }

  return (
    <div className={styles.Login}>
      <h1>login</h1>
      <form onSubmit={(e) => loginSubmit(e, { username, password })}>
        <ul>
          <li>
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email"
            />
          </li>
          <li>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </li>
        </ul>
        <button type="submit">
          Login
        </button>
      </form>
      <div>
        <span>
          <p>
            Dont have an account?
            <button onClick={() => props.setIsLogin(false)}>Register here</button>
          </p>
        </span>
      </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchLoginSubmit: data => {
      return dispatch(loginRetailer(data))
    }
  }
}

Login = connect(null, mapDispatchToProps)(Login);

export default Login;