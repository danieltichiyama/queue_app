import React, { useState } from "react";
import styles from "./Login.module.scss";
import { useDispatch } from "react-redux";
import { loginRetailer } from "../../actions";
import { useHistory } from "react-router-dom";


function Login(props) {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const loginSubmit = (e, loginData) => {
    e.preventDefault();
    dispatch(loginRetailer(loginData));
  };

  return (
    <div className={styles.Login}>
      <h1>login</h1>
      <form onSubmit={(e) => loginSubmit(e, { username, password })}>
        <ul>
          <li className={styles.inputFields}>
            <i className="fa fa-user icon"></i> 
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </li>
          <li className={styles.inputFields}>
            <i className="fa fa-lock" aria-hidden="true"></i>
            <input
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </li>
          <li className={styles.loginButton} >
            <button type="submit">Login</button>
          </li>
          <li className={styles.backButton}>
            <button type="button" onClick={() => history.push({pathname: "/"})}>
              Go back
            </button>
          </li>
        </ul>
      </form>
      <div>
        <span>
          <p>
            Dont have an account?
            <button onClick={() => props.setIsLogin(false)}>
              Register here
            </button>
          </p>
        </span>
      </div>
    </div>
  );
}

export default Login;
