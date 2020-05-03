import axios from 'axios';
import {URL} from "./initial"
// const URL = process.env.NODE_ENV === 'development' ? "http://127.0.0.1:5000/" : "https://dbmsbloodbank.herokuapp.com/"

// ========================== GET USER DETAILS API ==========================

// ACTIONS
export const GET_USER_DETAILS_STARTED = "GET_USER_DETAILS_STARTED"
export const GET_USER_DETAILS_SUCCESS = "GET_USER_DETAILS_SUCCESS"
export const GET_USER_DETAILS_FAILED = "GET_USER_DETAILS_FAILED"


export const getUserDetailsStarted = (payload) => {
    return { type: GET_USER_DETAILS_STARTED, payload };
}

export const getUserDetailsSuccess = (payload) => {
    return { type: GET_USER_DETAILS_SUCCESS, payload };
}

export const getUserDetailsFail = (payload) => {
    return { type: GET_USER_DETAILS_FAILED, payload };
}


export const getUserDetails = (UserID) => {
    return dispatch => {
        dispatch(getUserDetailsStarted());

        return axios.get(URL + `showprofile/` + parseInt(UserID))
            .then(res => {
                dispatch(getUserDetailsSuccess(res.data));
                return res.data
            })
            .catch(err => {
                dispatch(getUserDetailsFail(err.message));
                return err
            });
    };
};

// REDUCERS
const reducer = (state, action) => {
    switch (action.type) {

        case GET_USER_DETAILS_STARTED:
            return Object.assign({}, state, {
                UserDetailsLoading: true
            })

        case GET_USER_DETAILS_SUCCESS:
            return Object.assign({}, state, {
                UserDetailsLoading: false,
                UserDetails: action.payload
            })

        case GET_USER_DETAILS_FAILED:
            return Object.assign({}, state, {
                UserDetailsLoading: false,
                UserDetails: {},
                UserDetailsError: action.payload
            })

        // Default case when action doesn't match with any of defined
        default: return state;
    }
}

export default reducer
