import axios from 'axios';
import _ from "lodash"
import {URL} from "./initial"
// const URL = process.env.NODE_ENV === 'development' ? "http://127.0.0.1:5000/" : "https://dbmsbloodbank.herokuapp.com/"


// ========================== LOGIN API ==========================


// Actions
export const LOGIN_STARTED = "LOGIN_STARTED"
export const LOGIN_SUCCESS = "LOGIN_SUCCESS"
export const LOGIN_FAILED = "LOGIN_FAILED"

// LOGOUT 
export const LOGOUT = "LOGOUT"


export const logout = (payload = false) => {
    return { type: LOGOUT, payload };
}
export const loginStarted = (payload) => {
    return { type: LOGIN_STARTED, payload };
}

export const loginSuccess = (payload) => {
    return { type: LOGIN_SUCCESS, payload };
}

export const loginFail = (payload) => {
    return { type: LOGIN_FAILED, payload };
}

export const login = (UserID, Password, auto = false) => {
    return dispatch => {
        dispatch(loginStarted())
        return axios({
            method: 'post',
            url: URL + "login",
            headers: { 'Content-Type': 'application/json' },
            data: {
                "UserID": parseInt(UserID),
                "Password": Password
            }
        }).then(res => {
            let { status, message } = res.data
            if (auto) message = ""              //If it is auto login attempt, then don't set login message
            if (status === 200) {
                localStorage.setItem("UserID", UserID)
                localStorage.setItem("Password", Password)
                dispatch(loginSuccess({ message, status }))
                // Set access token instead
            }
            else {
                dispatch(loginFail({ message, status }))
            }
            return { status, message }

        }).catch(e => {
            console.log("ERROR | " + e)
            dispatch(loginFail(e))
            return e
        })
    }
}





// REDUCERS
const reducer = (state, action) => {

    switch (action.type) {

        // LOGIN API
        case LOGIN_STARTED:
            return Object.assign({}, state, {
                LoginLoading: true
            })

        case LOGIN_SUCCESS:
            return Object.assign({}, state, {
                LoginLoading: false,
                isLoggedIn: true,
                LoginMessage: _.get(action, "payload.message", "Successfully Logged In!")
            })

        case LOGIN_FAILED:
            return Object.assign({}, state, {
                LoginLoading: false,
                isLoggedIn: false,
                LoginMessage: _.get(action, "payload.message", "Couldn't Login!")
            })

        // LOGOUT 
        case LOGOUT:
            return Object.assign({}, state, {
                UserDetails: {},
                isLoggedIn: false,
                UserDetailsLoading: false,
                LoginMessage: null
            })

        // Default case when action doesn't match with any of defined
        default: return state;
    }
}

export default reducer