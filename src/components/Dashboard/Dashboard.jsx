import React, { useState, useEffect } from "react";
import styles from "./Dashboard.module.scss";
import { connect } from "react-redux";
import { updateRetailer } from "../../actions";

const Dashboard = (props) => {
  const [count, setCount] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

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
      <form className={styles.modal}>
        <label htmlFor="phoneNumber">
          <input
            type="tel"
            name="phoneNumber"
            id="phoneNumber"
            placeholder="XXX-XXX-XXXX"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
