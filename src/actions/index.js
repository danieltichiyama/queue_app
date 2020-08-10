import Axios from 'axios';

export const FETCH_RETAILERS = "FETCH_RETAILERS";
export const SEARCH_RETAILERS_BY_NAME = "SEARCH_RETAILERS_BY_NAME";
export const FETCH_ONE_RETAILER = "FETCH_ONE_RETAILER";
export const ADD_TO_WAITLIST = "ADD_TO_WAITLIST";
export const MOVE_TO_HOLDLIST = "MOVE_TO_HOLDLIST";
export const MOVE_TO_WAITLIST = "MOVE_TO_WAITLIST";
export const REMOVE_CUSTOMER_FROM_HOLDLIST = "REMOVE_CUSTOMER_FROM_HOLDLIST";
export const REMOVE_CUSTOMER_FROM_WAITLIST = "REMOVE_CUSTOMER_FROM_WAITLIST";
export const TWILIO_NOTIFICATION = "TWILIO_NOTIFICATION";

export const fetchRetailer = () => async dispatch => {
    await Axios.get("/api/retailers").then(retailers => {
        dispatch({
            type: FETCH_RETAILERS,
            payload: retailers
        })
    }).catch(err => {
        console.log(err.message)
    })
}

export const searchRetailersByName = data => async dispatch => {
    await Axios.get("/api/retailers", data).then(retailers => {
        dispatch({
            type: SEARCH_RETAILERS_BY_NAME,
            payload: retailers.data
        })
    }).catch(err => {
        console.log(err.message)
    })
}

export const fetchOneRetailer = data => async dispatch => {
    await Axios.get("/api/retailers", data).then(retailer => {
        dispatch({
            type: FETCH_ONE_RETAILER,
            payload: retailer.data
        })
    }).catch(err => {
        console.log(err.message)
    })
}

export const addToWaitlist = data => async dispatch => {
    await Axios.put("/api/retailers", data).then(customer => {
        dispatch({
            type: ADD_TO_WAITLIST,
            payload: customer.data
        })
    }).catch(err => {
        console.log(err.message)
    })
}

export const moveToHoldlist = data => async dispatch => {
    await Axios.get("/api/retailers", data).then(customer => {
        dispatch({
            type: MOVE_TO_HOLDLIST,
            payload: customer.data
        })
    }).catch(err => {
        console.log(err.message)
    })
}

export const moveToWaitlist = data => async dispatch => {
    console.log(data)
    await Axios.get("/api/retailers", data).then(customer => {
        dispatch({
            type: MOVE_TO_WAITLIST,
            payload: customer.data
        })
    }).catch(err => {
        console.log(err.message)
    })
}

export const removeCustomerFromHoldlist = data => async dispatch => {
    await Axios.delete("/api/retailers", data).then(customer => {
        dispatch({
            type: REMOVE_CUSTOMER_FROM_HOLDLIST,
            payload: customer.data
        })
    }).catch(err => {
        console.log(err.message)
    })
}

export const removeCustomerFromWaitlist = data => async dispatch => {
    await Axios.delete("/api/retailers", data).then(customer => {
        dispatch({
            type: REMOVE_CUSTOMER_FROM_WAITLIST,
            payload: customer.data
        })
    }).catch(err => {
        console.log(err.message)
    })
}

export const notifyCustomer = () => async dispatch => {
    await Axios.post("/api/sms/send").then(customer => {
        console.log(customer);
        dispatch({
            type: TWILIO_NOTIFICATION,
            payload: customer.data
        })
    }).catch(err => {
        console.log(err.message)
    })
}