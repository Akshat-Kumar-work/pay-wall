//this file contain all store logic

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { Provider } from "react-redux";

 const Store = configureStore({
    reducer:rootReducer
})

export default Store;


