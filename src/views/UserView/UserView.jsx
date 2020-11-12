import React from "react";
import styles from "./UserView.module.scss";
import magGlass from "../../utils/imgs/magGlass.png";
import { useDispatch, useSelector } from "react-redux";
import { actionFindRetailers, actionSearchRetailers } from "../../actions";
import RetailerCard from "../../components/RetailerCard/RetailerCard";
import { useEffect, useState } from "react";

function UserView(props) {
  const dispatch = useDispatch();
  const customerSearchRetailer = useSelector(state=> state.customerSearchRetailer);
  const [searchTerm, setSearchTerm] = useState('');
  //on mount find all retailers

  useEffect(() => {
    dispatch(actionFindRetailers());
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm !== '') {
      dispatch(actionSearchRetailers(searchTerm));
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
      {customerSearchRetailer.length === 0 ? <h1>{"No search results"}</h1> : null}
      <ul className={styles.results}>
        {customerSearchRetailer.map((store, index) => {
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



export default UserView;
