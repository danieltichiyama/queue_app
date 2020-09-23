import {
  FETCH_RETAILERS,
  SEARCH_RETAILERS_BY_NAME,
  FETCH_ONE_RETAILER,
  CREATE_RESERVATION,
  HOLD_RESERVATION,
  MOVE_TO_WAITLIST,
  REMOVE_CUSTOMER_FROM_HOLDLIST,
  REMOVE_CUSTOMER_FROM_WAITLIST,
  TWILIO_NOTIFICATION,
  UPDATE_RETAILER,
  LOGIN_RETAILER,
  LOGIN_ERROR,
  REGISTRATION_ERROR,
  FIND_RETAILERS_FOR_CUSTOMER,
  SEARCH_FOR_RETAILER,
  NO_SEARCH_RESULTS,
  UPDATE_RESERVATION,
} from "../actions";

const initialState = {
  retailers: [],
  customers: [],
  currentRetailer: {
    customersInStore: null,
    reservations: [],
  },
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
    case UPDATE_RESERVATION:
      return Object.assign({}, state, { currentRetailer: action.payload })
    case HOLD_RESERVATION:
      let holdReservations = state.currentRetailer.reservations;

      for (let i = 0; i < holdReservations.length; i++) {
        if (holdReservations[i]._id === action.payload._id) {
          holdReservations.splice(i, 1, action.payload);
        }
      }
      return Object.assign({}, state, {
        currentRetailer: {
          ...state.currentRetailer,
          reservations: holdReservations,
        },
      });
    case MOVE_TO_WAITLIST:
      return Object.assign({}, state, {});
    case REMOVE_CUSTOMER_FROM_HOLDLIST:
      return Object.assign({}, state, {});
    case REMOVE_CUSTOMER_FROM_WAITLIST:
      return Object.assign({}, state, {});
    case TWILIO_NOTIFICATION:
      let twilioNotifications = state.currentRetailer.reservations;

      for (let i = 0; i < twilioNotifications.length; i++) {
        if (twilioNotifications[i]._id === action.payload._id) {
          twilioNotifications.splice(i, 1, action.payload);
        }
      }
      return Object.assign({}, state, {
        currentRetailer: {
          ...state.currentRetailer,
          reservations: twilioNotifications,
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
