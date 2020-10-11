import React, { useState } from "react";
import styles from "./Register.module.scss";
import { useDispatch } from "react-redux";
import { registerRetailer } from "../../actions";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

function Register(props) {
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [retailerName, setRetailerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("AL");
  const [zipcode, setZipcode] = useState("");
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");

  const registerRetailerSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      setIsError(true);
      return;
    }

    let retailerObj = {
      username,
      password,
      retailerName,
      phoneNumber,
      address,
      city,
      state,
      zipcode,
      open: openingTime,
      close: closingTime,
      maxCapacity,
    };


    dispatch(registerRetailer(retailerObj));
    return props.setIsLogin(true);
  };

  return (
    <div className={styles.Register}>
      <h1>Register</h1>
      {isError && (
        <div className="errorMessage">
          <i
            onClick={(e) => {
              setIsError(false);
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </i>
          <div className="header">{errorMsg}</div>
        </div>
      )}
      <form onSubmit={(e) => registerRetailerSubmit(e)}>
        <ul>
          <li>
            <input
              type="text"
              name="retailerName"
              onChange={(e) => setRetailerName(e.target.value)}
              placeholder="Store Name"
            />
          </li>
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
            <input
              type="password"
              name="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
            />
          </li>
          <li>
            <input
              type="text"
              name="address"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Address"
            />
          </li>
          <li>
            <input
              type="text"
              name="city"
              onChange={(e) => setCity(e.target.value)}
              placeholder="City"
            />
            <select
              name="state"
              id="state"
              onChange={(e) => setState(e.target.value)}
            >
              {states.map((state) => {
                return (
                  <option key={state} value={state}>
                    {state}
                  </option>
                );
              })}
            </select>
            <input
              type="text"
              name="zipCode"
              onChange={(e) => setZipcode(e.target.value)}
              placeholder="Zip Code"
            />
          </li>
          <li>
            <input
              type="text"
              name="phoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Phone Number"
            />
          </li>
          <li>
            Opening Time:{" "}
            <input
              type="time"
              name="openingTime"
              onChange={(e) => setOpeningTime(e.target.value)}
              placeholder="Opening Time"
            />
            Closing Time:{" "}
            <input
              type="time"
              name="closingTime"
              onChange={(e) => setClosingTime(e.target.value)}
              placeholder="Closing Time"
            />
          </li>
          <li>
            <input
              type="number"
              name="maxCapacity"
              onChange={(e) => setMaxCapacity(e.target.value)}
              placeholder="Max Capacity"
            />
          </li>
        </ul>
        <button type="submit">Register</button>
        <button onClick={() => props.setIsLogin(true)}>Cancel</button>
      </form>
    </div>
  );
}

export default Register;
