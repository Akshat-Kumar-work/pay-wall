//this file contain combine reducer logic

import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";

const rootReducer = combineReducers({
    userSlice : userReducer
})

export default rootReducer;