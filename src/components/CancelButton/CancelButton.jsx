import React from 'react';
import styles from "./CancelButton.module.scss";
import cancelIcon from "../../assests/cancelIcon.png"
import { removeCustomerFromHoldlist, removeCustomerFromWaitlist } from "../../actions";
import { connect } from "react-redux";

function CancelButton(props) {
  // REMOVE FROM LIST
  return (
    <button className={styles.CancelButton}>
      <img src={cancelIcon} alt=""></img>
    </button>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchRemoveCustomerFromWaitList: () => {
      return dispatch(removeCustomerFromWaitlist());
    },
    dispatchRemoveCustomerFromHoldList: () => {
      return dispatch(removeCustomerFromHoldlist());
    }
  }
}

export default connect(null, mapDispatchToProps)(CancelButton);