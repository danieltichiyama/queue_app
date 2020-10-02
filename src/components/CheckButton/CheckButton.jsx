import React from 'react';
import styles from "./CheckButton.module.scss";
import checkMark from "../../assests/checkMarkIcon.png";

function CheckButton(props) {
  //CHECK IN TO STORE
  return (
    <button
      onClick={props.handleClick}
      className={styles.CheckButton}>
      <img src={checkMark} alt=""></img>
    </button>
  );
};

export default CheckButton;
