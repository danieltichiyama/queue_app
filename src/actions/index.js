import Axios from "axios";

export const FETCH_RETAILERS = "FETCH_RETAILERS";
export const SEARCH_RETAILERS_BY_NAME = "SEARCH_RETAILERS_BY_NAME";
export const FETCH_ONE_RETAILER = "FETCH_ONE_RETAILER";
export const CREATE_RESERVATION = "CREATE_RESERVATION";
export const HOLD_RESERVATION = "HOLD_RESERVATION";
export const MOVE_TO_WAITLIST = "MOVE_TO_WAITLIST";
export const REMOVE_CUSTOMER_FROM_HOLDLIST = "REMOVE_CUSTOMER_FROM_HOLDLIST";
export const REMOVE_CUSTOMER_FROM_WAITLIST = "REMOVE_CUSTOMER_FROM_WAITLIST";
export const TWILIO_NOTIFICATION = "TWILIO_NOTIFICATION";
export const UPDATE_RETAILER = "UPDATE_RETAILER";

const mockRetailerId = "111111111111111111111111";

export const updateRetailer = (data) => async (dispatch) => {
  await Axios.put("/api/retailers/QueueApp", data)
    .then((retailer) => {
      dispatch({
        type: UPDATE_RETAILER,
        payload: retailer.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const fetchRetailer = () => async (dispatch) => {
  await Axios.get("/api/retailers")
    .then((retailers) => {
      dispatch({
        type: FETCH_RETAILERS,
        payload: retailers,
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const searchRetailersByName = (data) => async (dispatch) => {
  await Axios.get("/api/retailers", data)
    .then((retailers) => {
      dispatch({
        type: SEARCH_RETAILERS_BY_NAME,
        payload: retailers.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const fetchOneRetailer = (data) => async (dispatch) => {
  // needs to be replaced later with dynamically generated ids
  await Axios.get(`/api/retailers/${mockRetailerId}`)
    .then((retailer) => {
      dispatch({
        type: FETCH_ONE_RETAILER,
        payload: retailer.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const createReservation = (data) => async (dispatch) => {
  // mock up until login works
  data.retailerId = mockRetailerId;

  await Axios.post("/api/reservations", data)
    .then((response) => {
      dispatch({
        type: CREATE_RESERVATION,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const holdReservation = (data) => async (dispatch) => {
  let url = `/api/reservations/${data.reservationId}`;
  delete data.reservationId;

  await Axios.put(url, data)
    .then((response) => {
      console.log("response: ", response);
      dispatch({
        type: HOLD_RESERVATION,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const moveToWaitlist = (data) => async (dispatch) => {
  await Axios.get("/api/retailers", data)
    .then((customer) => {
      dispatch({
        type: MOVE_TO_WAITLIST,
        payload: customer.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const removeCustomerFromHoldlist = (data) => async (dispatch) => {
  await Axios.delete("/api/retailers", data)
    .then((customer) => {
      dispatch({
        type: REMOVE_CUSTOMER_FROM_HOLDLIST,
        payload: customer.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const removeCustomerFromWaitlist = (data) => async (dispatch) => {
  await Axios.delete("/api/retailers", data)
    .then((customer) => {
      dispatch({
        type: REMOVE_CUSTOMER_FROM_WAITLIST,
        payload: customer.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const notifyCustomer = (data) => async (dispatch) => {
  await Axios.post("/api/sms/send", data)
    .then((response) => {
      dispatch({
        type: TWILIO_NOTIFICATION,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
