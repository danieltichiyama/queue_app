import {
  FETCH_RETAILERS,
  SEARCH_RETAILERS_BY_NAME,
  FETCH_ONE_RETAILER,
  ADD_TO_WAITLIST,
  MOVE_TO_HOLDLIST,
  MOVE_TO_WAITLIST,
  REMOVE_CUSTOMER_FROM_HOLDLIST,
  REMOVE_CUSTOMER_FROM_WAITLIST,
  TWILIO_NOTIFICATION,
  UPDATE_RETAILER,
} from "../actions";

const initialState = {
  retailers: [],
  customers: [],
  currentRetailer: {
    customersInStore: null,
    waitList: [],
    holdList: [],
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_RETAILER:
      return Object.assign({}, state, { currentRetailer: action.payload });
    case FETCH_RETAILERS:
      return Object.assign({}, state, { retailers: action.payload });
    case SEARCH_RETAILERS_BY_NAME:
      return Object.assign({}, state, { retailers: action.payload });
    case FETCH_ONE_RETAILER:
      return Object.assign({}, state, { currentRetailer: action.payload });
    case ADD_TO_WAITLIST:
      return Object.assign({}, state, { currentRetailer: action.payload });
    case MOVE_TO_HOLDLIST:
      return Object.assign({}, state, {});
    case MOVE_TO_WAITLIST:
      return Object.assign({}, state, {});
    case REMOVE_CUSTOMER_FROM_HOLDLIST:
      return Object.assign({}, state, {});
    case REMOVE_CUSTOMER_FROM_WAITLIST:
      return Object.assign({}, state, {});
    case TWILIO_NOTIFICATION:
      return Object.assign({}, state, {});
    default:
      return state;
  }
};

export default reducer;
