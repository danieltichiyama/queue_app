import React from 'react';
import styles from "./CancelButton.module.scss";
import cancelIcon from "../../assests/cancelIcon.png"

function CancelButton(props) {
  // REMOVE FROM LIST
  return (
    <button
      className={styles.CancelButton}
      onClick={props.handleClick}>
      <img src={cancelIcon} alt=""></img>
    </button>
  );
};

export default CancelButton;
