import React, { useState, useEffect } from "react";
import styles from "./RetailerView.module.scss";
import Reservation from "../../components/Reservation";
import clock from "../../utils/imgs/clock.png";
import { connect } from "react-redux";
import { fetchOneRetailer, actionUpdateRetailer } from "../../actions";
import Dashboard from "../../components/Dashboard/Dashboard.jsx";

function RetailerView(props) {
  //checks local storage for key
  let checkStorage = localStorage.getItem("currentCapacity");
  let maxCapacity = JSON.parse(localStorage.retailer).maxCapacity;
  let initialCount;
  if (checkStorage) {
    initialCount = parseInt(checkStorage);
  } else {
    initialCount = 0;
  };
  const [custCount, setCustCount] = useState(initialCount);

  const handlePlus = () => {
    const retailerId = JSON.parse(localStorage.retailer).id;
    let plus = custCount + 1;
    setCustCount(plus);
    localStorage.setItem("currentCapacity", JSON.stringify(plus));
    let data = { currentCapacity: plus };
    return props.changeCustomersInStore(data, retailerId);
  };
  const handleMinus = () => {
    const retailerId = JSON.parse(localStorage.retailer).id;
    if (custCount === 0) return;
    let minus = custCount - 1;
    setCustCount(minus);
    localStorage.setItem("currentCapacity", JSON.stringify(minus));
    let data = { currentCapacity: minus };
    return props.changeCustomersInStore(data, retailerId);
  };
  useEffect(() => {
    //start here
    // if (custCount === maxCapacity){
    // }
  }, [custCount]);


  // handles open and close of On Hold list
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let holdList = document.getElementById("holdList");
    let expand = document.getElementById("expand");
    let collapse = document.getElementById("collapse");
    let onHoldH3 = document.getElementById("onHoldH3");

    if (isOpen) {
      holdList.setAttribute("style", "top:3%");
      expand.setAttribute("style", "opacity: 0");
      collapse.setAttribute("style", "opacity: 1");
      onHoldH3.setAttribute("style", "opacity:1");
    } else {
      holdList.removeAttribute("style");
      expand.removeAttribute("style");
      collapse.removeAttribute("style");
      onHoldH3.removeAttribute("style");
    }
  }, [isOpen]);

  const handleExpand = () => {
    setIsOpen(true);
  };

  const handleCollapse = () => {
    setIsOpen(false);
  };

  // grabs the initial data when the view loads
  const { dispatchFetchOneRetailer } = props;
  useEffect(() => {
    let retailerID = JSON.parse(localStorage.getItem("retailer")).id;
    return dispatchFetchOneRetailer(retailerID);
  }, []);

  return (
    <>
      <div className={styles.RetailerView}>
        <ul className={styles.WaitList}>
          <div className={styles.header}>
            <h1>{props.retailerName}</h1>
            <div className={styles.time}>
              <img src={clock} alt="average wait time" />
              <h3>5 min</h3>
            </div>
          </div>
          <div className={styles.listContainer}>
            {props.waitList.map((reservation, index) => {
              let replyStatuses = {
                confirmed: "#6d9773",
                hold: "#ffba00",
                cancelled: "#ff421f",
              };

              let color;
              if (
                reservation.replyStatus !== "pending" ||
                reservation.replyStatus !== "entered"
              ) {
                color = replyStatuses[reservation.replyStatus];
              }
              return (
                <Reservation
                  reservation={reservation}
                  color={color}
                  index={index}
                  key={index}
                  handlePlus={handlePlus}
                  handleMinus={handleMinus}
                ></Reservation>
              );
            })}
          </div>
        </ul>
        <ul className={styles.HoldList} id="holdList">
          <div className={styles.expand} onClick={handleExpand} id="expand" />
          <div className={styles.header}>
            <h3 id="onHoldH3">On Hold</h3>
            <div className={styles.collapseContainer}>
              <div
                className={styles.collapse}
                onClick={handleCollapse}
                id="collapse"
              ></div>
            </div>
          </div>
          <div className={styles.listContainer}>
            {props.holdList.map((reservation, index) => {
              let replyStatuses = {
                confirmed: "#6d9773",
                hold: "#ffba00",
                cancelled: "#ff421f",
              };

              let color;
              if (
                reservation.replyStatus !== "pending" ||
                reservation.replyStatus !== "entered"
              ) {
                color = replyStatuses[reservation.replyStatus];
              }
              return (
                <Reservation
                  reservation={reservation}
                  color={color}
                  index={index}
                  key={index}
                  handlePlus={handlePlus}
                  handleMinus={handleMinus}
                ></Reservation>
              );
            })}{" "}
          </div>
        </ul>
      </div>
      <Dashboard
        custCount={custCount}
        handlePlus={handlePlus}
        handleMinus={handleMinus}
      />
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    waitList: state.currentRetailer.reservations.filter((res) => {
      return res.queueStatus === "wait";
    }),
    holdList: state.currentRetailer.reservations.filter((res) => {
      return res.queueStatus === "hold";
    }),
    retailerName: state.currentRetailer
      ? state.currentRetailer.retailerName
      : null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchFetchOneRetailer: (id) => {
      dispatch(fetchOneRetailer(id));
    },
    changeCustomersInStore: (data, id) => {
      dispatch(actionUpdateRetailer(data, id));
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(RetailerView);
