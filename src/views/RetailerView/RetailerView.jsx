import React, { useState, useEffect } from "react";
import styles from "./RetailerView.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { actionFetchOneRetailer, actionUpdateRetailer } from "../../actions";
import Dashboard from "../../components/Dashboard";
// import Profile from "../../components/Profile";
import WaitList from "../../components/WaitList/WaitList.jsx";
import HoldList from "../../components/HoldList/HoldList.jsx";

function RetailerView(props) {
  const dispatch = useDispatch();
  const waitList = useSelector(state=> state.currentRetailer.reservations.filter((res) => {
    return res.queueStatus === "wait";
  }))
  const holdList = useSelector(state=>state.currentRetailer.reservations.filter((res) => {
    return res.queueStatus === "hold";
  }))
  const retailerName = useSelector(state=>state.currentRetailer
    ? state.currentRetailer.retailerName
    : null)

  const retailer = useSelector(state=>state.currentRetailer);

  const [maxCapacity] = useState(JSON.parse(localStorage.retailer).maxCapacity);
  const [initialCount] = useState(
    parseInt(localStorage.getItem("currentCapacity")) || 0
  );
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
    if (custCount >= maxCapacity / 2 && custCount < maxCapacity)
      countElement.style.color = "orange";
    if (custCount === maxCapacity) {
      countElement.style.color = "red";
    } else if (custCount > maxCapacity) {
      countElement.style.color = "red";
      countElement.innerHTML = `${maxCapacity}(${overflow})`;
    }
  }, [custCount, maxCapacity]);

  //handles updating customer count to db
  useEffect(() => {
    let retailerId = JSON.parse(localStorage.retailer).id;

    if (custCount === maxCapacity) {
      dispatch(actionUpdateRetailer({ currentCapacity: custCount }, retailerId));
    }
    if (custCount === maxCapacity - 1) {
      dispatch(actionUpdateRetailer({ currentCapacity: custCount }, retailerId));
    }
  }, [custCount, maxCapacity, dispatch]);

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
  useEffect(() => {
    let retailer = JSON.parse(localStorage.getItem("retailer"))
    if (retailer) {
      dispatch(actionFetchOneRetailer(retailer.id));
    }
  }, [dispatch]);

  return (
    <>
      <div className={styles.RetailerView}>
        <WaitList
          retailerName={retailerName}
          waitList={waitList}
          handlePlusPartySize={handlePlusPartySize}
        />
        <HoldList
          holdList={holdList}
          handleCollapse={handleCollapse}
          handleExpand={handleExpand}
          handlePlusPartySize={handlePlusPartySize}
        />
      </div>
      <Dashboard
        custCount={custCount}
        handlePlus={handlePlus}
        handleMinus={handleMinus}
      />
      {/* Needs to be connected to a button to access retailer profile. */}
      {/* <Profile retailer={retailer} /> */}
    </>
  );
}


export default RetailerView;
