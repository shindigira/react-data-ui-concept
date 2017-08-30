import { combineReducers } from 'redux';
// import { routeReducer } from 'react-router-redux';

import todoReducer from './TodoReducer.js';
import userReducer from './UserReducer.js';

const rootReducer = combineReducers({
    todoState: todoReducer,
    userState: userReducer
});

export default rootReducer;
