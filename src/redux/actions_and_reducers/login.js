import axios from './initial';
import _ from "lodash"

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

export const login = (UserID, Password = "", autoReq) => {

    return dispatch => {
        dispatch(loginStarted())
        return axios({
            method: 'post',
            url: "login",
            data: {
                "UserID": parseInt(UserID),
                "Password": Password
            }
        }).then(res => {
            let { message, access_token } = res.data
            let { status } = res
            if (autoReq) message = ""              //If it is auto login attempt, then don't set login message

            if (status === 200) {
                localStorage.setItem("access_token", access_token)
                dispatch(loginSuccess({ message, status }))
            }
            else {
                dispatch(loginFail({ message, status }))
            }
            return { message, status }

        }).catch(e => {
            localStorage.clear()        //Clear the local storage if login request fails
            let message = _.get(e, 'response.data.message', '')
            let status = _.get(e, 'response.data.status', 401)
            if (autoReq) message = ""             //If it is auto login attempt, then don't set login message
            dispatch(loginFail({ message }))
            return { message, status }
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