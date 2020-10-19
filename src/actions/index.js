import Axios from "axios";

//PLEASE LABEL ALL FUNCTIONS STARTING WITH "action"
export const FETCH_RETAILERS = "FETCH_RETAILERS";
export const SEARCH_RETAILERS_BY_NAME = "SEARCH_RETAILERS_BY_NAME";
export const FETCH_ONE_RETAILER = "FETCH_ONE_RETAILER";
export const CREATE_RESERVATION = "CREATE_RESERVATION";
export const TWILIO_NOTIFICATION = "TWILIO_NOTIFICATION";
export const UPDATE_RETAILER = "UPDATE_RETAILER";
export const LOGIN_RETAILER = "LOGIN_RETAILER";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT_RETAILER = "LOGOUT_RETAILER";
export const REGISTER_RETAILER = "REGISTER_RETAILER";
export const REGISTRATION_ERROR = "REGISTRATION_ERROR";
export const FIND_RETAILERS_FOR_CUSTOMER = "FIND_RETAILERS_FOR_CUSTOMER";
export const SEARCH_FOR_RETAILER = "SEARCH_FOR_RETAILER";
export const NO_SEARCH_RESULTS = "NO_SEARCH_RESULTS";
export const UPDATE_RESERVATION = "UPDATE_RESERVATION";
export const VERIFICATION_TYPE = "VERIFICATION_TYPE";
export const VERIFY_PIN = "VERIFY_PIN";

export const actionUpdateRetailer = (data, retailerId) => async (dispatch) => {
  let url = `/api/retailers/${retailerId}`

  await Axios.put(url, data)
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

export const actionUpdateReservation = (data, id) => async (dispatch) => {
  let url = `/api/reservations/${id}`;

  await Axios.put(url, data)
    .then((response) => {
      dispatch({
        type: UPDATE_RESERVATION,
        payload: response.data,
      });
    })
    .catch((err) => {
      console.log("Error from actionUpdateReservation ", err.message);
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
      console.log(err.message);
    });
};

export const loginRetailer = (data) => async (dispatch) => {
  console.log("zzzzzz");
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

export const logoutRetailer = () => async (dispatch) => {
  await Axios.get("/api/retailers/logout")
    .then(() => {
      dispatch({
        type: LOGOUT_RETAILER,
      })
    })
    .catch(({ message, response }) => {
      console.log(response);
      console.log(message);
    })
}

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

export const actionVerificationType = (data) => async (dispatch) => {
  await Axios.post(`api/verification/${data.retailerId}/send`, data)
    .then((retailers) => {
      dispatch({ type: VERIFICATION_TYPE, payload: retailers });
    })
    .catch((err) => {
      console.log("Error from verification process", err.message);
    });
};

export const actionVerifyPIN = (data) => async (dispatch) => {
  await Axios.post(`api/verification/${data.retailerId}/check`, data)
    .then((retailers) => {
      dispatch({ type: VERIFY_PIN, payload: retailers });
    })
    .catch((err) => {
      console.log("Error from verification process", err.message);
    });
};
