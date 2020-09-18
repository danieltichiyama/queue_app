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
} from "../actions";

const initialState = {
  retailers: [],
  customers: [],
  currentRetailer: {
    customersInStore: null,
    reservations: [],
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
    case CREATE_RESERVATION:
      return Object.assign({}, state, { currentRetailer: action.payload });
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
    default:
      return state;
  }
};

export default reducer;
