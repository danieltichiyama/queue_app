import React from "react";
import styles from "./UserView.module.scss";
import magGlass from "../../utils/imgs/magGlass.png";
import { connect } from "react-redux";
import { actionFindRetailers, actionSearchingRetailers } from "../../actions";
import RetailerCard from "../../components/RetailerCard/RetailerCard";
import { useEffect, useState } from "react";

function UserView(props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [foundRetailers, setFoundRetailers] = useState([]);
  //on mount find all retailers

  let {dispatchFindRetailers} = props
  useEffect(() => {
    return dispatchFindRetailers();
  }, [dispatchFindRetailers]);

  useEffect(() => {
    return setFoundRetailers(props.customerSearchRetailer);
  }, [props.customerSearchRetailer]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm !== '') {
      props.dispatchSearchingRetailers(searchTerm);
    }
    return setSearchTerm('');
  };

  const handleSearchInput = (e) => {
    e.preventDefault();
    const { value } = e.target;
    return setSearchTerm(value);
  };

  return (
    <div className={styles.UserView}>
      <form
        className={styles.searchContainer}
        onSubmit={handleSearchSubmit}
      >
        <input
          className={styles.searchbar}
          type="search"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchInput}
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
              key={index}
              index={index}
              store={store}
            />)
        })}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    customerSearchRetailer: [...state.customerSearchRetailer],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchFindRetailers: () => {
      return dispatch(actionFindRetailers());
    },
    dispatchSearchingRetailers: (term) => {
      return dispatch(actionSearchingRetailers(term));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserView);
