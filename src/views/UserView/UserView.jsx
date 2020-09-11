import React, { Component } from "react";
import styles from "./UserView.module.scss";
import magGlass from "../../utils/imgs/magGlass.png";
import { connect } from "react-redux";
import { actionFindRetailers } from "../../actions"

class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
  }

  componentDidMount() {
    this.props.dispatchFindRetailers()
  }

  render() {
    console.log('11111', this.state)
    console.log('22222', this.props.customerSearchRetailer)
    let foundRetailers = this.props.customerSearchRetailer;
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
          {foundRetailers.map((store, index) => {
            return (
              <li className={styles.result} key={"retailers-" + index}>
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
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customerSearchRetailer: [...state.customerSearchRetailer]
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchFindRetailers: () => {
      dispatch(actionFindRetailers());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserView);
