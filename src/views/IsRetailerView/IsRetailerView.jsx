import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import styles from "./IsRetailerView.module.scss";

function IsRetailerView(props) {
  const [isRetailer, setIsRetailer] = useState();
  const [isUser] = useState(localStorage.getItem("isUser"));

  if (isUser) {
    return <Redirect to="/userview" />;
  }

  if (isRetailer === true){
    localStorage.setItem("isRetailer", true)
    return <Redirect to="/retailerview" /> 
  } else if (isRetailer === false){
    localStorage.setItem("isUser", true);
    return <Redirect to="/userview" />
  }

  const handleButtonClick = (type) => {
    setIsRetailer(type);
  }

  return (
    <div className={styles.isRetailer}>
      <h2>ARE YOU A RETAILER?</h2>
      <button onClick={() => handleButtonClick(true)}>YES</button>
      <button onClick={() => handleButtonClick(false)}>NO</button>
    </div>
  );
}

export default IsRetailerView;