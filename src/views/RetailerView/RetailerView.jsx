import React, { useState, useEffect } from "react";
import styles from "./RetailerView.module.scss";
import Reservation from "../../components/Reservation";
import clock from "../../utils/imgs/clock.png";
import { connect } from "react-redux";
import { fetchOneRetailer, actionUpdateRetailer } from "../../actions";
import Dashboard from "../../components/Dashboard/Dashboard.jsx";

function RetailerView(props) {
  const [maxCapacity] = useState(JSON.parse(localStorage.retailer).maxCapacity)
  const [initialCount] = useState(parseInt(localStorage.getItem("currentCapacity")) || 0)
  const [custCount, setCustCount] = useState(initialCount);

  const handlePlus = () => {
    let plus = custCount + 1;
    setCustCount(plus);
    return localStorage.setItem("currentCapacity", JSON.stringify(plus));
  };
  const handleMinus = () => {
    if (custCount === 0) return;
    let minus = custCount - 1;
    setCustCount(minus);
    return localStorage.setItem("currentCapacity", JSON.stringify(minus));
  };
  const handlePlusPartySize = (partySize) => {
    let plus = custCount + partySize;
    setCustCount(plus);
    return localStorage.setItem("currentCapacity", JSON.stringify(plus));
  };
  //handles store count color change
  useEffect(() => {
    let countElement = document.getElementById("customer-count");
    let overflow = parseInt(countElement.innerHTML - maxCapacity);
    if (custCount < maxCapacity / 2) countElement.style.color = "black";
    if (custCount >= maxCapacity / 2 && custCount < maxCapacity) countElement.style.color = "orange";
    if (custCount === maxCapacity) {
      countElement.style.color = "red";
    } else if (custCount > maxCapacity) {
      countElement.style.color = "red";
      countElement.innerHTML = `${maxCapacity}(${overflow})`
    };
  }, [custCount, maxCapacity]);
  let { changeCustomersInStore } = props;
  //handles updating customer count to db
  useEffect(() => {
    let retailerId = JSON.parse(localStorage.retailer).id;
    if (custCount === maxCapacity) {
      return changeCustomersInStore({ currentCapacity: custCount }, retailerId)
    }
    if (custCount === maxCapacity - 1) {
      return changeCustomersInStore({ currentCapacity: custCount }, retailerId)
    }
  }, [custCount, maxCapacity, changeCustomersInStore]);

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
    let source = new EventSource("http://localhost:3000/api/retailers/sse");

    source.addEventListener("message", (event) => {
      console.log(event);
    });

    source.onerror = function (err) {
      console.error("EventSource failed:", err);
    };

    return dispatchFetchOneRetailer(retailerID);
  }, [dispatchFetchOneRetailer]);

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
                  handlePlusPartySize={handlePlusPartySize}
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
                  handlePlusPartySize={handlePlusPartySize}
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
