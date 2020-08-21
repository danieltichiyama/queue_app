import React, { useState } from 'react';
import styles from "./Register.module.scss";

function Register(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [retailerName, setRetailerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("")
  const [storeHours, setStoreHours] = useState("");
  const [capacity, setCapacity] = useState("");
  const [timers, setTimers] = useState("");

  return (
    <div className={styles.Register}>
      <h1>Register</h1>
      <form onSubmit={(e) => props.setIsLogin(true)}>
        <ul>
          <li>
            <input
              type="text"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
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
          <li>
            <input />
          </li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;