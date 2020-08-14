import React, { useState, useEffect } from "react";
import styles from "./RetailerView.module.scss";
import moment from "moment";
import clock from "../../utils/imgs/clock.png";
import CheckButton from "../../components/CheckButton";
import NotificationButton from "../../components/NotificationButton";
import HoldButton from "../../components/HoldButton";
import CancelButton from "../../components/CancelButton"

moment.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s ago",
    s: "just now",
    ss: "just now",
    m: "%d min",
    mm: "%d mins",
    h: "%d hour",
    hh: "%d hours",
  },
});

const Customers = (props) => {
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
          <CheckButton props={props} />
          <NotificationButton props={props}/>
          <HoldButton props={props}/>
          <CancelButton props={props}/>
          {/* <div className={styles.icon} onClick={toggleConfirm}></div>
          <div className={styles.icon} onClick={toggleConfirm}></div> */}
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

function RetailerView(props) {
  const [retailer] = useState({
    // Mock retailer data
    id: 1,
    retailerName: "Mybuzz",
    address: {
      streetNumber: 2,
      street: "Anhalt Hill",
      city: "Honolulu",
      state: "HI",
      zipcode: 12345,
    },
    phoneNumber: "759-408-3657",
    openingTime: "9:17 AM",
    closingTime: "10:50 PM",
    avgWaitTime: 67,
    waitListCount: 11,
    maxCapacity: 100,
    inStoreCount: 22,
  });
  const [waitList] = useState([
    {
      id: 1,
      name: "Crystal Ockleshaw",
      phoneNumber: "412-350-1148",
      partySize: 5,
      status: "pending",
      createdAt: moment.utc(new Date() - 90000).fromNow(true),
    },
    {
      id: 2,
      name: "Katlin Jermyn",
      phoneNumber: "163-928-6598",
      partySize: 3,
      status: "pending",
      createdAt: moment.utc(new Date() - 90000).fromNow(true),
    },
    {
      id: 3,
      name: "Russ Elletson",
      phoneNumber: "173-732-5387",
      partySize: 1,
      status: "confirmed",
      createdAt: moment.utc(new Date() - 10000000).fromNow(true),
    },
    {
      id: 4,
      name: "Roi Gillson",
      phoneNumber: "254-916-7739",
      partySize: 2,
      status: "confirmed",
      createdAt: moment.utc(new Date() - 5000000).fromNow(true),
    },
    {
      id: 5,
      name: "Wren Miller",
      phoneNumber: "191-866-7411",
      partySize: 3,
      status: "confirmed",
      createdAt: moment.utc(new Date() - 5000000).fromNow(true),
    },
    {
      id: 6,
      name: "Glen Scanlin",
      phoneNumber: "485-389-7663",
      partySize: 5,
      status: "cancelled",
      createdAt: moment.utc(new Date() - 5000000).fromNow(true),
    },
    {
      id: 7,
      name: "Hilde Bernt",
      phoneNumber: "271-751-4385",
      partySize: 6,
      status: "cancelled",
      createdAt: moment.utc(new Date() - 5000000).fromNow(true),
    },
    {
      id: 8,
      name: "Marita Tiffany",
      phoneNumber: "865-951-6349",
      partySize: 6,
      status: "hold",
      createdAt: moment.utc(new Date() - 5000000).fromNow(true),
    },
    {
      id: 9,
      name: "Far Shinner",
      phoneNumber: "106-598-2132",
      partySize: 1,
      status: "hold",
      createdAt: moment.utc(new Date() - 5000000).fromNow(true),
    },
    {
      id: 10,
      name: "Jeddy Brendish",
      phoneNumber: "451-895-8232",
      partySize: 1,
      status: "hold",
      createdAt: moment.utc(new Date() - 5000000).fromNow(true),
    },
  ]);
  const [holdList] = useState([
    {
      id: 1,
      name: "Ricky Bobby",
      phoneNumber: "412-350-1148",
      partySize: 5,
      status: "pending",
      createdAt: moment.utc(new Date() - 5000000).fromNow(true),
    },
    {
      id: 2,
      name: "Kat Williams",
      phoneNumber: "163-928-6598",
      partySize: 3,
      status: "pending",
      createdAt: moment.utc(new Date() - 5000000).fromNow(true),
    },
    {
      id: 3,
      name: "No Fuss Russ",
      phoneNumber: "173-732-5387",
      partySize: 1,
      status: "confirmed",
      createdAt: moment.utc(new Date() - 5000000).fromNow(true),
    },
    {
      id: 4,
      name: "Roi da Boi",
      phoneNumber: "254-916-7739",
      partySize: 2,
      status: "confirmed",
      createdAt: moment.utc(new Date() - 5000000).fromNow(true),
    },
    {
      id: 5,
      name: "Mayhem Miller",
      phoneNumber: "191-866-7411",
      partySize: 3,
      status: "confirmed",
      createdAt: moment.utc(new Date() - 5000000).fromNow(true),
    },
    {
      id: 6,
      name: "Glenda Ling",
      phoneNumber: "485-389-7663",
      partySize: 5,
      status: "cancelled",
      createdAt: moment.utc(new Date() - 5000000).fromNow(true),
    },
    {
      id: 7,
      name: "Hilde Tilde",
      phoneNumber: "271-751-4385",
      partySize: 6,
      status: "cancelled",
      createdAt: moment.utc(new Date() - 5000000).fromNow(true),
    },
    {
      id: 8,
      name: "Marita Margarita",
      phoneNumber: "865-951-6349",
      partySize: 6,
      status: "hold",
      createdAt: moment.utc(new Date() - 5000000).fromNow(true),
    },
    {
      id: 9,
      name: "Far Seer",
      phoneNumber: "106-598-2132",
      partySize: 1,
      status: "hold",
      createdAt: moment.utc(new Date() - 5000000).fromNow(true),
    },
    {
      id: 10,
      name: "Red Eye Jedi",
      phoneNumber: "451-895-8232",
      partySize: 1,
      status: "hold",
      createdAt: moment.utc(new Date() - 5000000).fromNow(true),
    },
  ]);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let holdList = document.getElementById("holdList");
    let expand = document.getElementById("expand");
    let collapse = document.getElementById("collapse");

    if (isOpen) {
      holdList.setAttribute("style", "top:3%");
      expand.setAttribute("style", "display: none");
      collapse.removeAttribute("style");
    } else {
      holdList.removeAttribute("style");
      expand.removeAttribute("style");
      collapse.setAttribute("style", "display: none");
    }
  }, [isOpen]);

  const handleExpand = () => {
    setIsOpen(true);
  };

  const handleCollapse = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles.RetailerView}>
      <ul className={styles.WaitList}>
        <div className={styles.header}>
          <h3>Queue</h3>
          <div className={styles.time}>
            <img src={clock} alt="average wait time" />
            <h3>5 min</h3>
          </div>
        </div>
        <div className={styles.listContainer}>
          {waitList.map((customer, index) => {
            let statuses = {
              confirmed: "#6d9773",
              hold: "#ffba00",
              cancelled: "#ff421f",
            };

            let color;
            if (
              customer.status !== "pending" ||
              customer.status !== "entered"
            ) {
              color = statuses[customer.status];
            }
            return (
              <Customers
                customer={customer}
                retailer={retailer}
                color={color}
                index={index}
                key={index}
                listType="wait"
              ></Customers>
            );
          })}
        </div>
      </ul>
      <ul className={styles.HoldList} id="holdList">
        <div className={styles.expand} onClick={handleExpand} id="expand" />
        <div className={styles.header}>
          <h3>On Hold</h3>
          <div
            className={styles.collapse}
            onClick={handleCollapse}
            id="collapse"
          ></div>
        </div>
        <div className={styles.listContainer}>
          {holdList.map((customer, index) => {
            let statuses = {
              confirmed: "#6d9773",
              hold: "#ffba00",
              cancelled: "#ff421f",
            };

            let color;
            if (
              customer.status !== "pending" ||
              customer.status !== "entered"
            ) {
              color = statuses[customer.status];
            }
            return (
              <Customers
                customer={customer}
                retailer={retailer}
                color={color}
                index={index}
                key={index}
                listType="hold"
              ></Customers>
            );
          })}{" "}
        </div>
      </ul>
    </div>
  );
}

export default RetailerView;
