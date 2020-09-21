import Axios from "axios";

//PLEASE LABEL ALL FUNCTIONS STARTING WITH "action"
export const FETCH_RETAILERS = "FETCH_RETAILERS";
export const SEARCH_RETAILERS_BY_NAME = "SEARCH_RETAILERS_BY_NAME";
export const FETCH_ONE_RETAILER = "FETCH_ONE_RETAILER";
export const CREATE_RESERVATION = "CREATE_RESERVATION";
export const MOVE_TO_HOLDLIST = "MOVE_TO_HOLDLIST";
export const MOVE_TO_WAITLIST = "MOVE_TO_WAITLIST";
export const REMOVE_CUSTOMER_FROM_HOLDLIST = "REMOVE_CUSTOMER_FROM_HOLDLIST";
export const REMOVE_CUSTOMER_FROM_WAITLIST = "REMOVE_CUSTOMER_FROM_WAITLIST";
export const TWILIO_NOTIFICATION = "TWILIO_NOTIFICATION";
export const UPDATE_RETAILER = "UPDATE_RETAILER";
export const LOGIN_RETAILER = "LOGIN_RETAILER";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const REGISTER_RETAILER = "REGISTER_RETAILER";
export const REGISTRATION_ERROR = "REGISTRATION_ERROR";
export const FIND_RETAILERS_FOR_CUSTOMER = "FIND_RETAILERS_FOR_CUSTOMER";
export const SEARCH_FOR_RETAILER = "SEARCH_FOR_RETAILER";
export const NO_SEARCH_RESULTS = "NO_SEARCH_RESULTS";

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

export const fetchOneRetailer = (id) => async (dispatch) => {
  // needs to be replaced later with dynamically generated ids
  await Axios.get(`/api/retailers/${id}`)
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

export const moveToHoldList = (data) => async (dispatch) => {
  await Axios.get("/api/retailers", data)
    .then((customer) => {
      dispatch({
        type: MOVE_TO_HOLDLIST,
        payload: customer.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
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
      console.log(response.data);
      dispatch({
        type: TWILIO_NOTIFICATION,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
};

export const loginRetailer = (data) => async (dispatch) => {
  await Axios.post("/api/retailers/login", data)
    .then((response) => {
      dispatch({
        type: LOGIN_RETAILER,
        payload: response.data,
      });
    })
    .catch(({ message, response }) => {
      console.log(response);
      console.log(message);
      if (response.status === 401) {
        dispatch({
          type: LOGIN_ERROR,
          payload: response.data.message,
        });
      }
    });
};

export const registerRetailer = (data) => async (dispatch) => {
  await Axios.post("/api/retailers/register", data)
    .then((response) => {
      dispatch({
        type: REGISTER_RETAILER,
        payload: response.data,
      });
    })
    .catch(({ message, response }) => {
      console.log(response);
      console.log(message);
      dispatch({
        type: REGISTRATION_ERROR,
      });
    });
};

export const actionFindRetailers = () => async (dispatch) => {
  await Axios.get("/api/customers/")
    .then((retailers) => {
      dispatch({
        type: FIND_RETAILERS_FOR_CUSTOMER,
        payload: retailers.data,
      });
    })
    .catch((err) => {
      console.log("Error from actionFindRetailers", err.message);
    });
};

export const actionSearchingRetailers = (searchTerm) => async (dispatch) => {
  await Axios.get("/api/customers/search?searchTerm=" + searchTerm)
    .then((retailers) => {
      dispatch({
        type: SEARCH_FOR_RETAILER,
        payload: retailers.data,
      });
    })
    .catch((err) => {
      if (err.response.status === 500) {
        return dispatch({
          type: NO_SEARCH_RESULTS,
        });
      }
      console.log("Error from actionSearchingRetailers", err.message);
    });
};
