import { configureStore } from "@reduxjs/toolkit";
import LocationReducer from "./redux/Location/LocationReducer";



export const store = configureStore({
    reducer:{
        location:LocationReducer
    }
})