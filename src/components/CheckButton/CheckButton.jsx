import React from 'react';
import styles from "./CheckButton.module.scss";
import checkMark from "../../assests/checkMarkIcon.png";
import { removeCustomerFromWaitlist } from "../../actions";
import { connect } from "react-redux";

function CheckButton(props) {
  //CHECK IN TO STORE

  
  return (
    <button onClick={props.dispatchRemoveCustomerFromWaitList} className={styles.CheckButton}>
      <img src={checkMark} alt=""></img>
    </button>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchRemoveCustomerFromWaitList: () => {
      return dispatch(removeCustomerFromWaitlist());
    }
  }
}

export default connect(null, mapDispatchToProps)(CheckButton);