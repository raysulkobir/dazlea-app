import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../features/auth/state/authSlice';
import counterReducer from '../features/counter/state/counterSlice';


const rootReducer = combineReducers({
    auth: authReducer,
    counter: counterReducer,
});

export default rootReducer;
