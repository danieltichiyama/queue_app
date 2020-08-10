import React, { useState, useEffect } from "react";
import { addToWaitlist } from './../../actions'
import { connect } from 'react-redux'
import PhoneInput from 'react-phone-number-input/input';
import { formatPhoneNumber, isValidPhoneNumber } from "react-phone-number-input"
import styles from "./Dashboard.module.scss";
import { updateRetailer } from "../../actions";

const Dashboard = (props) => {
  const [count, setCount] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState();
  const [customerName, setCustomerName] = useState();
  const [partySize, setPartySize] = useState();

  const handlePlus = () => {
    setCount(count + 1);
  };

  const handleMinus = () => {
    setCount(count - 1);
  };

  const handleExpand = () => {
    setIsOpen(true);
  };

  const handleCollapse = () => {
    setIsOpen(false);
  };

  const handleName = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCustomerName(e.target.value)
  }

  const handlePartySize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPartySize(e.target.value)
  }

  const addToQueue = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let formData = {
      phoneNumber: phoneNumber,
      name: customerName,
      partySize: partySize
    }
    props.dispatchAddToWaitlist(formData);
  }

  useEffect(() => {
    let dashboard = document.querySelector("#dashboard");
    let addbutton = document.querySelector("#dynamic-add");

    if (isOpen) {
      dashboard.setAttribute("style", "top: 3vh");
      addbutton.innerHTML = "CLOSE";
      addbutton.setAttribute("style", "background: #ff421f; color: white");
      addbutton.removeEventListener("click", handleExpand);
      addbutton.addEventListener("click", handleCollapse);
    } else {
      dashboard.removeAttribute("style");
      addbutton.innerHTML = "ADD TO QUEUE";
      addbutton.removeAttribute("style");
      addbutton.removeEventListener("click", handleCollapse);
      addbutton.addEventListener("click", handleExpand);
    }
  }, [isOpen]);

  useEffect(() => {
    let data = { customersInStore: count };
    props.changeCustomersInStore(data);
  }, [count]);

  return (
    <div className={styles.Dashboard} id="dashboard">
      <div className={styles.counter}>
        <div className={styles.counterButton} onClick={handleMinus}>
          -
        </div>
        <div className={styles.count}>
          <h3>{props.customersInStore}</h3>
          <p>in store</p>
        </div>
        <div className={styles.counterButton} onClick={handlePlus}>
          +
        </div>
      </div>
      <button className={styles.addToQueue} id="dynamic-add">
        ADD TO QUEUE
      </button>
      <form className={styles.modal} onSubmit={addToQueue}>
        <label htmlFor="phoneNumber">
          <PhoneInput
            country="US"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="XXX-XXX-XXXX"
            value={phoneNumber}
            onChange={setPhoneNumber}
            error={phoneNumber ? (isValidPhoneNumber(phoneNumber) ? undefined : "Invalid phone number") : "Phone number is required"}
            required
          />
          <span className={styles.validity}></span>
        </label>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Guest Name"
            onChange={handleName}
            required
          />
          <span className={styles.validity}></span>
        </label>
        <label htmlFor="">
          <input
            type="number"
            name="partySize"
            id="partySize"
            placeholder="# in Party"
            onChange={handlePartySize}
            required
          />
          <span className={styles.validity}></span>
        </label>

        <button type="submit" className={styles.addToQueue}>
          ADD TO QUEUE
        </button>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  if (!state) {
    return;
  }
  return {
    customersInStore: state.currentRetailer.customersInStore,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCustomersInStore: (data) => {
      return dispatch(updateRetailer(data));
    },
    dispatchAddToWaitlist: (data) => {
      return dispatch(addToWaitlist(data))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
