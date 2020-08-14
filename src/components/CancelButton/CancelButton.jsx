import React from 'react';
import styles from "./CancelButton.module.scss";
import cancelIcon from "../../assests/cancelIcon.png"
import { removeCustomerFromHoldlist, removeCustomerFromWaitlist } from "../../actions";
import { connect } from "react-redux";

function CancelButton(props) {
  // REMOVE FROM LIST

  const runDispatch = (data) => {
    // still need to wait for login to get retailer id to hit route
    if (data.listType === "wait") {
      return props.dispatchRemoveCustomerFromWaitList({ 
        retailerId: data.retailer.id,
        customerId: data.customer.id 
      })
    } else if (props.listType === "hold") {
      return props.dispatchRemoveCustomerFromHoldList({
        retailerId: data.retailer.id, 
        customerId: data.customer.id 
      })
    }
  }

  return (
    <button onClick={() => runDispatch(props.props)} className={styles.CancelButton}>
      <img src={cancelIcon} alt=""></img>
    </button>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchRemoveCustomerFromWaitList: (data) => {
      return dispatch(removeCustomerFromWaitlist(data));
    },
    dispatchRemoveCustomerFromHoldList: (data) => {
      return dispatch(removeCustomerFromHoldlist(data));
    }
  }
}

export default connect(null, mapDispatchToProps)(CancelButton);