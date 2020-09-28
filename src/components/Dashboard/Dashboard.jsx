import React, { useState, useEffect } from "react";
import { createReservation } from "./../../actions";
import { connect } from "react-redux";
import PhoneInput from "react-phone-number-input/input";
import { isValidPhoneNumber } from "react-phone-number-input";
import styles from "./Dashboard.module.scss";
import { actionUpdateRetailer } from "../../actions";

const Dashboard = (props) => {
  let checkStorage = localStorage.getItem("currentCapacity");
  let initialCount;
  if (checkStorage) {
    initialCount = parseInt(checkStorage);
  } else {
    initialCount = 0;
  };
  const [custCount, setCustCount] = useState(initialCount);

  const [isOpen, setIsOpen] = useState(false);

  const [phoneNumber, setPhoneNumber] = useState();
  const [customerName, setCustomerName] = useState();
  const [partySize, setPartySize] = useState();

  // adds to countInStore for "+" press
  const handlePlus = () => {
    let plus = custCount + 1;
    setCustCount(plus);
    localStorage.setItem("currentCapacity", JSON.stringify(plus));
    let data = { currentCapacity: plus };
    return props.changeCustomersInStore(data, props.retailerId);
  };

  // minuses from countInStore for "-" press
  const handleMinus = () => {
    if (custCount === 0) return;

    let minus = custCount - 1;
    setCustCount(minus);
    localStorage.setItem("currentCapacity", JSON.stringify(minus));
    let data = { currentCapacity: minus };
    return props.changeCustomersInStore(data, props.retailerId);
  };

  //useEffect for + and -
  useEffect(() => {
    setCustCount(custCount)
  }, [custCount]);

  const handleExpand = () => {
    setIsOpen(true);
  };

  const handleCollapse = () => {
    setIsOpen(false);
  };

  const handleName = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setCustomerName(e.target.value);
  };

  const handlePartySize = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setPartySize(e.target.value);
  };

  const createReservation = (e) => {
    e.preventDefault();
    e.stopPropagation();
    let formData = {
      phoneNumber: phoneNumber,
      name: customerName,
      partySize: partySize,
      retailerId: props.retailerId,
    };
    props.dispatchCreateReservation(formData);
    return resetQueueForm();
  };

  const resetQueueForm = () => {
    document.getElementById("phone-input-form").reset();
    document.getElementsByName("phoneNumber")[0].value = '';
    return
  };

  // opens and closes dashboard for adding guests to waitlist
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

  return (
    <div className={styles.Dashboard} id="dashboard">
      <div className={styles.counter}>
        <div className={styles.counterButton} onClick={handleMinus}>
          -
        </div>
        <div className={styles.count}>
          <h3>{custCount}</h3>
          <p>in store</p>
        </div>
        <div className={styles.counterButton} onClick={handlePlus}>
          +
        </div>
      </div>
      <button className={styles.addToQueue} id="dynamic-add">
        ADD TO QUEUE
      </button>
      <form
        className={styles.modal}
        id="phone-input-form"
        onSubmit={createReservation}
      >
        <label htmlFor="phoneNumber">
          <PhoneInput
            country="US"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="XXX-XXX-XXXX"
            value={phoneNumber}
            onChange={setPhoneNumber}
            error={
              phoneNumber
                ? isValidPhoneNumber(phoneNumber)
                  ? undefined
                  : "Invalid phone number"
                : "Phone number is required"
            }
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
  return {
    customersInStore: state.currentRetailer.customersInStore,
    retailerId: state.currentRetailer._id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCustomersInStore: (data, id) => {
      return dispatch(actionUpdateRetailer(data, id));
    },
    dispatchCreateReservation: (data) => {
      return dispatch(createReservation(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
