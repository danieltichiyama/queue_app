import React, { Component } from "react";
import styles from "./UserView.module.scss";
import magGlass from "../../utils/imgs/magGlass.png";
import { connect } from "react-redux";
import { actionFindRetailers, actionSearchingRetailers } from "../../actions";
import RetailerCard from "../../components/RetailerCard/RetailerCard";

class UserView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };
  }

  handleSearchInput = (e) => {
    e.preventDefault();
    const { value } = e.target;
    this.setState({ searchTerm: value });
  };

  handleSearchSubmit = (e) => {
    e.preventDefault();
    if (this.state.searchTerm !== "") {
      this.props.dispatchSearchingRetailers(this.state.searchTerm);
    }
    this.setState({ searchTerm: "" });
  };

  componentDidMount() {
    this.props.dispatchFindRetailers();
  }

  render() {
    let foundRetailers = this.props.customerSearchRetailer;
    return (
      <div className={styles.UserView}>
        <form
          className={styles.searchContainer}
          onSubmit={this.handleSearchSubmit}
        >
          <input
            className={styles.searchbar}
            type="search"
            placeholder="Search"
            value={this.state.searchTerm}
            onChange={this.handleSearchInput}
          />
          <button type="submit">
            <img src={magGlass} alt="search" />
          </button>
        </form>
        {foundRetailers.length === 0 ? <h1>{"No search results"}</h1> : null}
        <ul className={styles.results}>
          {foundRetailers.map((store, index) => {
            return (
              <RetailerCard
                index={index}
                store={store}
              />)
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customerSearchRetailer: [...state.customerSearchRetailer],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchFindRetailers: () => {
      dispatch(actionFindRetailers());
    },
    dispatchSearchingRetailers: (term) => {
      return dispatch(actionSearchingRetailers(term));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserView);
