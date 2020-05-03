import {rootReducer} from "../actions_and_reducers/reducer";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, applyMiddleware(thunk));

// window.getUserDetails = getUserDetails;
// import { getUserDetails } from "../actions"
export default store;