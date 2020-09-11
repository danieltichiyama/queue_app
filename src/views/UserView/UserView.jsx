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
    console.log('customerSearchRetailer', this.props.customerSearchRetailer)
    let foundRetailers = this.props.customerSearchRetailer;
    return (
      <div className={styles.UserView}>
        <div className={styles.searchContainer}>
          <input
            type="search"
            placeholder="Search"
            className={styles.searchbar}
          />
          <img src={magGlass} alt="search" />
        </div>
        <ul className={styles.results}>
          {foundRetailers.map((store, index) => {
            return (
              <li className={styles.result} key={"retailers-" + index}>
                <div className={styles.generalInfo}>
                  <h3>{store.retailerName}</h3>
                  <p>
                    {`Open: ${store.open} ~ Close: ${store.close}`}
                  </p>
                  <p>
                    {`${store.address}`}
                    <br />
                    {`${store.city}, ${store.state} ${store.zipcode}`}
                  </p>
                  <a href={`tel:${store.phoneNumber}`}>{store.phoneNumber}</a>
                </div>

                <div className={styles.counter}>
                  <p className={styles.count}>{store.waitListCount}</p>
                  <p>waiting</p>
                  <p>{`Max: ${store.maxCapacity}`}</p>
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
