import React, { useState, useEffect } from "react";
import styles from "./CustomerInList.module.scss";
import clock from "../../utils/imgs/clock.png";

const Customer = (props) => {
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

  return (
    <li key={"customer-" + props.index} style={{ background: props.color }}>
      <p className={styles.phoneNumber}> {props.customer.phoneNumber}</p>
      <div className={styles.time}>
        <img src={clock} alt="time in queue" />
        <p> {props.customer.createdAt}</p>
      </div>

      <div className={styles.menuButton} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>

      {menuOpen ? (
        <div className={styles.menu} id="customerMenu" ref={setWrapperRef}>
          {/* placeholders */}
          <div className={styles.icon} onClick={toggleConfirm}></div>
          <div className={styles.icon} onClick={toggleConfirm}></div>
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

export default Customer;
