import getUserDetails from './getUserDetails';
import login from './login'

export const initialState = {
    UserDetails: {},
    UserDetailsLoading: false,
    UserDetailsError: null,

    isLoggedIn: false,
    LoginLoading: false,
    LoginMessage: null
};

const reducers = [
    login,
    getUserDetails
];

export const rootReducer = (state = initialState, action) => {
    // console.log("ORIGINAL TYPE", login)
    // console.log("I GOT TYPE", reducer)
    let newState;
    switch (action.type) {
        // Put global reducers here
        default:
            newState = state;
            break;
    }

    return reducers.reduce((s, r) => r(s, action), newState);
}