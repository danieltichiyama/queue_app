import React from "react";
import styles from "./NotificationButton.module.scss";
import bellIcon from "../../assests/bellIcon.png";
// import { notifyCustomer } from "../../actions";

function NotificationButton(props) {
  return (
    <button
      onClick={props.handleClick}
      disabled={props.disableButton}
      className={styles.NotificationButton}
    >
      <img src={bellIcon} alt=""></img>
    </button>
  );
}

export default NotificationButton;
