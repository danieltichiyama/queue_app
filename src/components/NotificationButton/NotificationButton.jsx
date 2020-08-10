import React from 'react';
import styles from "./NotificationButton.module.scss";
import bellIcon from "../../assests/bellIcon.png";
import { connect } from "react-redux";
import { notifyCustomer } from "../../actions";

function NotificationButton(props) {
  // NOTIFY USER

  return (
    <button onClick={props.dispatchNotifyCustomer} className={styles.NotificationButton}>
      <img src={bellIcon} alt=""></img>
    </button>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchNotifyCustomer: () => {
      return dispatch(notifyCustomer())
    }
  }
}
export default connect(null, mapDispatchToProps)(NotificationButton);