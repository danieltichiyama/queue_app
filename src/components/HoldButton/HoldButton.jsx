import React from 'react';
import styles from "./HoldButton.module.scss";
import pauseIcon from "../../assests/pauseIcon.png";
import { moveToHoldlist } from "../../actions";
import { connect } from "react-redux";

function HoldButton(props) {
  //PUTS ON HOLD LIST

  return (
    <button onClick={props.dispatchMoveCustomerToHoldList} className={styles.HoldButton}>
      <img src={pauseIcon} alt=""></img>
    </button>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchMoveCustomerToHoldList: (data) => {
      return dispatch(moveToHoldlist(data))
    }
  }
}
export default connect(null, mapDispatchToProps)(HoldButton);