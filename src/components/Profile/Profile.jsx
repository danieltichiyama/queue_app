import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"
import {actionUpdateRetailer} from "../../actions"
import styles from "./Profile.module.scss";
import moment from "moment";

const Profile = (props) => {
  const dispatch = useDispatch();
  const retailerID = useSelector(state => state.currentRetailer._id)
  const [profile, setProfile] = useState({});

  useEffect(() => {
    setProfile(props.retailer);
  }, [props.retailer]);

  const handleInput = ((e)=>{
    let {value, name} = e.target;

    setProfile({...profile, [name]: value});
    
  })

  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(actionUpdateRetailer(profile, retailerID))
  }

  const handleCancel = (e)=>{
    e.preventDefault();
    setProfile(props.retailer);
  }


  return (
    <div className={styles.Profile}>
      Profile
      <div className={styles.container}>
        <form onSubmit = {handleSubmit}>
          <label htmlFor="name">
            Name
            <input
            onChange = {handleInput} name = "retailerName" type="text" value={profile.retailerName || ""} />
          </label>
          <label htmlFor="phoneNumber">
            Phone number
            <input
            onChange = {handleInput}
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              value={profile.phoneNumber || ""}
            />
          </label>
          <div className={styles.address1}>
            <label className={styles.street} htmlFor="street">
              Street
              <input
              onChange = {handleInput}
                type="text"
                name="address"
                id="address "
                value={profile.address || ""}
              />
            </label>
          </div>
          <div className={styles.address2}>
            <label htmlFor="city">
              City
              <input
              onChange = {handleInput} type="text" name="city" id="city" value={profile.city || ""} />
            </label>
            <label htmlFor="state">
              State
              <input
              onChange = {handleInput}
                type="text"
                name="state"
                className={styles.state}
                id="state"
                value={profile.state || ""}
              />
            </label>
            <label htmlFor="zipcode">
              Zipcode
              <input
              onChange = {handleInput}
                type="text"
                name="zipcode"
                className={styles.zipcode}
                id="zipcode"
                value={profile.zipcode || ""}
              />
            </label>
          </div>

          <div className={styles.hours}>
            <label htmlFor="open">
              Open
              <input
              onChange = {handleInput}
                type="time"
                name="open"
                id="open"
                value={moment(profile.open, "HH:mm").format("HH:mm") || ""}
              />
            </label>
            <label htmlFor="close">
              Close
              <input
              onChange = {handleInput}
                type="time"
                name="close"
                id="close"
                value={moment(profile.close, "HH:mm").format("HH:mm") || ""}
              />
            </label>
          </div>

          <label htmlFor="maxCapacity">
            Store Capacity
            <input
            onChange = {handleInput}
              type="number"
              name="maxCapacity"
              id="maxCapacity"
              value={profile.maxCapacity || 0}
            />
          </label>
          <input type="submit" value="Save changes"/>
          <input type="button" value="Cancel" onClick = {handleCancel}/>
        </form>
      </div>
    </div>
  );
};

export default Profile;
