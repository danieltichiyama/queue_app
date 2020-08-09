import React, { useState } from "react";
import styles from "./RetailerView.module.scss";
import moment from "moment";

function RetailerView(props) {
  const [retailer, setRetailer] = useState({
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
  });
  const [waitList, setWaitList] = useState([
    {
      id: 1,
      name: "Crystal Ockleshaw",
      phoneNumber: "412-350-1148",
      partySize: 5,
      status: "nothing",
      createdAt: moment.utc(new Date() - 5000000).fromNow(),
    },
    {
      id: 2,
      name: "Katlin Jermyn",
      phoneNumber: "163-928-6598",
      partySize: 3,
      status: "nothing",
      createdAt: moment.utc(new Date() - 5000000).fromNow(),
    },
    {
      id: 3,
      name: "Russ Elletson",
      phoneNumber: "173-732-5387",
      partySize: 1,
      status: "confirmed",
      createdAt: moment.utc(new Date() - 5000000).fromNow(),
    },
    {
      id: 4,
      name: "Roi Gillson",
      phoneNumber: "254-916-7739",
      partySize: 2,
      status: "confirmed",
      createdAt: moment.utc(new Date() - 5000000).fromNow(),
    },
    {
      id: 5,
      name: "Wren Miller",
      phoneNumber: "191-866-7411",
      partySize: 3,
      status: "confirmed",
      createdAt: moment.utc(new Date() - 5000000).fromNow(),
    },
    {
      id: 6,
      name: "Glen Scanlin",
      phoneNumber: "485-389-7663",
      partySize: 5,
      status: "denied",
      createdAt: moment.utc(new Date() - 5000000).fromNow(),
    },
    {
      id: 7,
      name: "Hilde Bernt",
      phoneNumber: "271-751-4385",
      partySize: 6,
      status: "denied",
      createdAt: moment.utc(new Date() - 5000000).fromNow(),
    },
    {
      id: 8,
      name: "Marita Tiffany",
      phoneNumber: "865-951-6349",
      partySize: 6,
      status: "onHold",
      createdAt: moment.utc(new Date() - 5000000).fromNow(),
    },
    {
      id: 9,
      name: "Far Shinner",
      phoneNumber: "106-598-2132",
      partySize: 1,
      status: "onHold",
      createdAt: moment.utc(new Date() - 5000000).fromNow(),
    },
    {
      id: 10,
      name: "Jeddy Brendish",
      phoneNumber: "451-895-8232",
      partySize: 1,
      status: "onHold",
      createdAt: moment.utc(new Date() - 5000000).fromNow(),
    },
  ]);
  const [holdList, setHoldList] = useState([
    {
      id: 1,
      name: "Ricky Bobby",
      phoneNumber: "412-350-1148",
      partySize: 5,
      status: "nothing",
      createdAt: moment.utc(new Date() - 5000000).fromNow(),
    },
    {
      id: 2,
      name: "Kat Williams",
      phoneNumber: "163-928-6598",
      partySize: 3,
      status: "nothing",
      createdAt: moment.utc(new Date() - 5000000).fromNow(),
    },
    {
      id: 3,
      name: "No Fuss Russ",
      phoneNumber: "173-732-5387",
      partySize: 1,
      status: "confirmed",
      createdAt: moment.utc(new Date() - 5000000).fromNow(),
    },
    {
      id: 4,
      name: "Roi da Boi",
      phoneNumber: "254-916-7739",
      partySize: 2,
      status: "confirmed",
      createdAt: moment.utc(new Date() - 5000000).fromNow(),
    },
    {
      id: 5,
      name: "Mayhem Miller",
      phoneNumber: "191-866-7411",
      partySize: 3,
      status: "confirmed",
      createdAt: moment.utc(new Date() - 5000000).fromNow(),
    },
    {
      id: 6,
      name: "Glenda Ling",
      phoneNumber: "485-389-7663",
      partySize: 5,
      status: "denied",
      createdAt: moment.utc(new Date() - 5000000).fromNow(),
    },
    {
      id: 7,
      name: "Hilde Tilde",
      phoneNumber: "271-751-4385",
      partySize: 6,
      status: "denied",
      createdAt: moment.utc(new Date() - 5000000).fromNow(),
    },
    {
      id: 8,
      name: "Marita Margarita",
      phoneNumber: "865-951-6349",
      partySize: 6,
      status: "onHold",
      createdAt: moment.utc(new Date() - 5000000).fromNow(),
    },
    {
      id: 9,
      name: "Far Seer",
      phoneNumber: "106-598-2132",
      partySize: 1,
      status: "onHold",
      createdAt: moment.utc(new Date() - 5000000).fromNow(),
    },
    {
      id: 10,
      name: "Red Eye Jedi",
      phoneNumber: "451-895-8232",
      partySize: 1,
      status: "onHold",
      createdAt: moment.utc(new Date() - 5000000).fromNow(),
    },
  ]);

  const mapCustomers = (list) => {
    return list.map((customer) => {
      return (
        <li>
          <p> {customer.phoneNumber}</p>
          <div>C</div>
          <p> {customer.createdAt}</p>
          <div className={styles.menuButton}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
        </li>
      );
    });
  };

  return (
    <div className={styles.RetailerView}>
      <ul className={styles.WaitList}>
        <div className={styles.header}>
          <h3>Queue</h3>
          <div>timer</div>
        </div>
        {mapCustomers(waitList)}
      </ul>
      <ul className={styles.HoldList}>
        HOLDLIST
        {mapCustomers(holdList)}
      </ul>
    </div>
  );
}

export default RetailerView;
