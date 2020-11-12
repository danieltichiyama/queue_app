import React from "react";
import styles from "./HoldButton.module.scss";
import pauseIcon from "../../assests/pauseIcon.png";

function HoldButton(props) {
  return (
    <button
      onClick={props.handleClick}
      className={styles.HoldButton}>
      <img src={pauseIcon} alt=""></img>
    </button>
  );
}

export default HoldButton;
