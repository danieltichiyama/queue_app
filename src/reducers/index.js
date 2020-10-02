import {
  FETCH_RETAILERS,
  SEARCH_RETAILERS_BY_NAME,
  FETCH_ONE_RETAILER,
  CREATE_RESERVATION,
  MOVE_TO_HOLDLIST,
  MOVE_TO_WAITLIST,
  REMOVE_CUSTOMER_FROM_HOLDLIST,
  REMOVE_CUSTOMER_FROM_WAITLIST,
  TWILIO_NOTIFICATION,
  UPDATE_RETAILER,
  LOGIN_RETAILER,
  LOGIN_ERROR,
  LOGOUT_RETAILER,
  REGISTRATION_ERROR,
  FIND_RETAILERS_FOR_CUSTOMER,
  SEARCH_FOR_RETAILER,
  NO_SEARCH_RESULTS,
} from "../actions";

const initialState = {
  retailers: [],
  customers: [],
  currentRetailer: {
    customersInStore: null,
    reservations: [],
  },
  isLoggedIn: (!!localStorage.getItem("retailer")),
  customerSearchRetailer: [],
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
    case CREATE_RESERVATION:
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
      let { reservations } = state.currentRetailer;
      for (let i = 0; i < reservations.length; i++) {
        if (reservations[i]._id === action.payload._id) {
          reservations.splice(i, 1, action.payload);
        }
      }
      return Object.assign({}, state, {
        currentRetailer: {
          ...state.currentRetailer,
          reservations: reservations,
        },
      });
    case LOGIN_RETAILER:
      localStorage.setItem("retailer", JSON.stringify(action.payload));
      return Object.assign({}, state, {
        currentRetailer: action.payload,
        isLoggedIn: true,
      });
    case LOGIN_ERROR:
      alert(action.payload);
      return state;
    case LOGOUT_RETAILER:
      localStorage.removeItem("retailer");
      localStorage.removeItem("isRetailer")
      return Object.assign({}, state, { isLoggedIn: false })
    case REGISTRATION_ERROR:
      alert("something went wrong with your registration.");
      return state;
    case FIND_RETAILERS_FOR_CUSTOMER:
      return Object.assign({}, state, {
        customerSearchRetailer: action.payload,
      });
    case SEARCH_FOR_RETAILER:
      return Object.assign({}, state, {
        customerSearchRetailer: action.payload,
      });
    case NO_SEARCH_RESULTS:
      return Object.assign({}, state, { customerSearchRetailer: [] });
    default:
      return state;
  }
};

export default reducer;
