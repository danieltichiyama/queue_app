import React, { useState, useEffect } from "react";
import styles from "./RetailerView.module.scss";
import Reservation from "../../components/Reservation";
import clock from "../../utils/imgs/clock.png";
import { connect } from "react-redux";
import { fetchOneRetailer } from "../../actions";
import Dashboard from "../../components/Dashboard/Dashboard.jsx";

function RetailerView(props) {
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
                ></Reservation>
              );
            })}{" "}
          </div>
        </ul>
      </div>
      <Dashboard />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RetailerView);
