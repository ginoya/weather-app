import { useDispatch, useSelector } from "react-redux";
import { getAxios } from "../apis/getAxios";
import { fetchWeatherData, setErrorinWeather, setWeatherData } from "../redux/Weather/WeatherActions";
import { useEffect } from "react";
import { openWeatherKey } from "../utils/constants";

export const useFetchCurrentWeatherData = () => {
    const locationData = useSelector((state: any) => state.location)
    const dispatch = useDispatch();

    const getCurrentWeather = () => {
        dispatch(fetchWeatherData())
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = locationData.latitude === null ? position.coords.latitude : locationData.latitude;
            const longitude = locationData.longitude === null ? position.coords.longitude : locationData.longitude
            getAxios(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherKey}`
            ).then((res) => {
                dispatch(setWeatherData(res.data))
            }).catch((err) => {
                dispatch(setErrorinWeather(err.toString()))
            });
        })
    }

    useEffect(() => {
        getCurrentWeather()
    }, [locationData.latitude, locationData.longitude]);

}