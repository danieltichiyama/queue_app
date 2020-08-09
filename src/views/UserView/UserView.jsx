import React, { Component } from "react";
import styles from "./UserView.module.scss";
import magGlass from "../../utils/imgs/magGlass.png";

class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // Mock data for Retailer list
      storesList: [
        {
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
        },
        {
          id: 2,
          retailerName: "Yabox",
          address: {
            streetNumber: 55153,
            street: "Parkside Junction",
            city: "Honolulu",
            state: "HI",
            zipcode: 12345,
          },
          phoneNumber: "684-271-7893",
          openingTime: "9:25 AM",
          closingTime: "9:58 PM",
          avgWaitTime: 1666,
          waitListCount: 4,
          maxCapacity: 100,
        },
        {
          id: 3,
          retailerName: "Gabtype",
          address: {
            streetNumber: 40113,
            street: "Mayer Plaza",
            city: "Honolulu",
            state: "HI",
            zipcode: 12345,
          },
          phoneNumber: "459-322-9548",
          openingTime: "8:08 AM",
          closingTime: "9:39 PM",
          avgWaitTime: 1994,
          waitListCount: 23,
          maxCapacity: 100,
        },
        {
          id: 4,
          retailerName: "Fivebridge",
          address: {
            streetNumber: 5137,
            street: "Ridgeway Road",
            city: "Honolulu",
            state: "HI",
            zipcode: 12345,
          },
          phoneNumber: "227-157-9276",
          openingTime: "9:15 AM",
          closingTime: "7:17 PM",
          avgWaitTime: 887,
          waitListCount: 5,
          maxCapacity: 100,
        },
        {
          id: 5,
          retailerName: "Pixoboo",
          address: {
            streetNumber: 998,
            street: "Sauthoff Terrace",
            city: "Honolulu",
            state: "HI",
            zipcode: 12345,
          },
          phoneNumber: "809-491-9900",
          openingTime: "8:00 AM",
          closingTime: "8:42 PM",
          avgWaitTime: 1959,
          waitListCount: 13,
          maxCapacity: 100,
        },
        {
          id: 6,
          retailerName: "Feedfire",
          address: {
            streetNumber: 6631,
            street: "Florence Alley",
            city: "Honolulu",
            state: "HI",
            zipcode: 12345,
          },
          phoneNumber: "615-470-9087",
          openingTime: "8:51 AM",
          closingTime: "8:35 PM",
          avgWaitTime: 292,
          waitListCount: 14,
          maxCapacity: 100,
        },
        {
          id: 7,
          retailerName: "Midel",
          address: {
            streetNumber: 70764,
            street: "Dorton Road",
            city: "Honolulu",
            state: "HI",
            zipcode: 12345,
          },
          phoneNumber: "543-887-9672",
          openingTime: "8:45 AM",
          closingTime: "9:12 PM",
          avgWaitTime: 232,
          waitListCount: 14,
          maxCapacity: 100,
        },
        {
          id: 8,
          retailerName: "Realblab",
          address: {
            streetNumber: 8136,
            street: "Texas Lane",
            city: "Honolulu",
            state: "HI",
            zipcode: 12345,
          },
          phoneNumber: "606-249-1752",
          openingTime: "8:11 AM",
          closingTime: "8:05 PM",
          avgWaitTime: 849,
          waitListCount: 21,
          maxCapacity: 100,
        },
        {
          id: 9,
          retailerName: "Midel",
          address: {
            streetNumber: 4,
            street: "Victoria Court",
            city: "Honolulu",
            state: "HI",
            zipcode: 12345,
          },
          phoneNumber: "972-613-1749",
          openingTime: "8:43 AM",
          closingTime: "8:08 PM",
          avgWaitTime: 1480,
          waitListCount: 5,
          maxCapacity: 100,
        },
        {
          id: 10,
          retailerName: "Roombo",
          address: {
            streetNumber: 9,
            street: "Warbler Terrace",
            city: "Honolulu",
            state: "HI",
            zipcode: 12345,
          },
          phoneNumber: "958-269-0481",
          openingTime: "8:32 AM",
          closingTime: "8:50 PM",
          avgWaitTime: 1719,
          waitListCount: 14,
          maxCapacity: 100,
        },
      ],
    };
  }

  mapStores = (storesList) => {
    return storesList.map((store) => {
      return (
        <li className={styles.result}>
          <div className={styles.generalInfo}>
            <h3>{store.retailerName}</h3>
            <p>
              {`${store.address.streetNumber} ${store.address.street}`}
              <br />
              {`${store.address.city}, ${store.address.state} ${store.address.zipcode}`}
            </p>
            <a href={`tel:${store.phoneNumber}`}>{store.phoneNumber}</a>
          </div>

          <div className={styles.counter}>
            <p className={styles.count}>{store.waitListCount}</p>
            <p>waiting</p>
          </div>
        </li>
      );
    });
  };

  render() {
    return (
      <div className={styles.UserView}>
        <div className={styles.searchContainer}>
          <input
            type="search"
            placeholder="Search"
            className={styles.searchbar}
          ></input>
          <img src={magGlass} alt="search" />
        </div>
        <ul className={styles.results}>
          {this.mapStores(this.state.storesList)}
        </ul>
      </div>
    );
  }
}

export default UserView;
