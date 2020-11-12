import React, { useState, useEffect } from "react";
import styles from "./Reservation.module.scss";
import clock from "../../utils/imgs/clock.png";
import CancelButton from "../CancelButton";
import CheckButton from "../CheckButton";
import HoldButton from "../HoldButton";
import NotificationButton from "../NotificationButton";
import moment from "moment";
import { connect } from "react-redux";
import {
  notifyCustomer,
  actionUpdateReservation
} from "../../actions";

const Reservation = (props) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  let wrapperRef;

  const setWrapperRef = (node) => {
    wrapperRef = node;
  };

  const handleClickOutside = (event) => {
    if (
      wrapperRef &&
      !wrapperRef.contains(event.target) &&
      (event.target.id !== "customerMenu" || event.target.id !== "confirmMenu")
    ) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
  });

  const toggleConfirm = () => {
    setConfirmOpen(!confirmOpen);

    toggleMenu();
  };

  const handleConfirm = () => {
    // this is where we need to send the data to the backend

    setConfirmOpen(false);
  };

  const handleNotificationClick = () => {
    let data = {
      phoneNumber: props.reservation.customerId.phoneNumber,
      retailerName: props.retailerName,
      reservationId: props.reservation._id,
    };
    return props.dispatchNotifyCustomer(data);
  };

  const handleHoldClick = () => {
    let data = { queueStatus: "hold", };
    props.dispatchUpdateReservation(data, props.reservation.id);
    return toggleMenu();
  };

  const handleRemoveCustomer = () => {
    let data = { queueStatus: 'cancelled' };
    props.dispatchUpdateReservation(data, props.reservation.id);
    return toggleMenu();
  };

  const handleCheckinCustomer = () => {
    let data = { queueStatus: 'enter' };
    props.dispatchUpdateReservation(data, props.reservation.id);
    props.handlePlusPartySize(props.reservation.partySize);
    return toggleMenu();
  };
  const { isHold } = props;
  const { phoneNumber } = props.reservation.customerId;
  const phone = (phoneNumber).replace(/\W\d(\d\d\d)(\d\d\d)(\d\d\d\d)/, '($1) $2-$3');
  moment.locale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s',
      s: 'Just now',
      ss: 'Just now',
      m: '1m ago',
      mm: '%dm ago',
      h: '1h',
      hh: '%dh ago',
      d: '1d',
      dd: '%dd ago',
      M: '1m',
      MM: '%dM ago',
      y: '1y',
      yy: '%dY ago'
    }
  });
  let formattedTime = moment(props.reservation.createdAt).fromNow();

  return (
    <li key={"customer-" + props.index} style={{ background: props.color }}>
      <p className={styles.phoneNumber}>
        {phone}<br />
        Party: {props.reservation.partySize}
      </p>
      <div className={styles.time}>
        <img src={clock} alt="time in queue" />
        <p> {formattedTime}</p>
      </div>

      <div className={styles.menuButton} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      {menuOpen ? (
        <div className={styles.menu} id="customerMenu" ref={setWrapperRef}>
          <CheckButton
            handleClick={handleCheckinCustomer}
          />
          <NotificationButton
            onClick={toggleConfirm}
            handleClick={handleNotificationClick}
            disableButton={
              props.reservation.replyStatus === "pending" ? true : false
            } />
          {!isHold ? <HoldButton handleClick={handleHoldClick} /> : null}
          <CancelButton
            handleClick={handleRemoveCustomer} />
        </div>
      ) : null}

      {confirmOpen ? (
        <div className={styles.menu} id="confirmMenu" ref={setWrapperRef}>
          {/* placeholders */}
          <button id="confirm" onClick={handleConfirm}>
            CONFIRM
          </button>
          <button id="cancel" onClick={toggleConfirm}>
            CANCEL
          </button>
        </div>
      ) : null}
    </li>
  );
};

const mapStateToProps = (state) => {
  return {
    retailerName: state.currentRetailer.retailerName,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchNotifyCustomer: (data) => {
      return dispatch(notifyCustomer(data));
    },
    dispatchUpdateReservation: (data, id) => {
      return dispatch(actionUpdateReservation(data, id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);
