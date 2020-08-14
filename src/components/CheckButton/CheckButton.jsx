import React from 'react';
import styles from "./CheckButton.module.scss";
import checkMark from "../../assests/checkMarkIcon.png";
import { removeCustomerFromWaitlist, removeCustomerFromHoldlist } from "../../actions";
import { connect } from "react-redux";

function CheckButton(props) {
  //CHECK IN TO STORE
  let phoneNumber = props.props.customer.phoneNumber.replace(/-/g, '');
  if (phoneNumber.length === 10) {
    phoneNumber = `+1${phoneNumber}`;
  } else if (phoneNumber.slice(0, 1) === "1") {
    phoneNumber = `+${phoneNumber}`;
  }
  
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
    <button onClick={() => runDispatch(props.props)} className={styles.CheckButton}>
      <img src={checkMark} alt=""></img>
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

export default connect(null, mapDispatchToProps)(CheckButton);