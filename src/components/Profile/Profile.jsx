import React, { useState, useEffect } from "react";
import styles from "./Profile.module.scss";
import moment from "moment";

const Profile = (props) => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setProfile(props.retailer);
  }, [props.retailer]);

  return (
    <div className={styles.Profile}>
      Profile
      <div className={styles.container}>
        <form>
          <label htmlFor="name">
            Name
            <input type="text" value={profile.retailerName} />
          </label>
          <label htmlFor="phoneNumber">
            Phone number
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              value={profile.phoneNumber}
            />
          </label>
          <div className={styles.address1}>
            <label className={styles.street} htmlFor="street">
              Street
              <input
                type="text"
                name="street"
                id="street1"
                value={profile.address}
              />
            </label>
          </div>
          <div className={styles.address2}>
            <label htmlFor="city">
              City
              <input type="text" name="city" id="city" value={profile.city} />
            </label>
            <label htmlFor="state">
              State
              <input
                type="text"
                name="state"
                className={styles.state}
                id="state"
                value={profile.state}
              />
            </label>
            <label htmlFor="zipcode">
              Zipcode
              <input
                type="text"
                name="zipcode"
                className={styles.zipcode}
                id="zipcode"
                value={profile.zipcode}
              />
            </label>
          </div>

          <div className={styles.hours}>
            <label htmlFor="open">
              Open
              <input
                type="time"
                name="open"
                id="open"
                value={moment(profile.open, "HH:mm").format("HH:mm")}
              />
            </label>
            <label htmlFor="close">
              Close
              <input
                type="time"
                name="close"
                id="close"
                value={moment(profile.close, "HH:mm").format("HH:mm")}
              />
            </label>
          </div>

          <label htmlFor="maxCapacity">
            Store Capacity
            <input
              type="number"
              name="maxCapacity"
              id="maxCapacity"
              value={profile.maxCapacity}
            />
          </label>
        </form>
      </div>
    </div>
  );
};

export default Profile;
