//this file contain combine reducer logic

import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import balanceReducer from "./slices/balanceSlice";

const rootReducer = combineReducers({
    user : userReducer,
    balance:balanceReducer
})

export default rootReducer;