import { configureStore } from "@reduxjs/toolkit";
import LocationReducer from "./redux/Location/LocationReducer";
import WeatherReducer from "./redux/Weather/WeatherReducer";



export const store = configureStore({
    reducer:{
        location:LocationReducer,
        weatherData : WeatherReducer
    }
})