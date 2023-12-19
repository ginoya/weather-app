import { useDispatch, useSelector } from "react-redux";
import { getAxios } from "../apis/getAxios";
import { fetchWeatherData, setErrorinWeather, setWeatherData } from "../redux/Weather/WeatherActions";
import { useEffect } from "react";
import { openWeatherKey } from "../utils/constants";
import { getLatitude, getLongitude } from "../utils/forecastUtils";

export const useFetchCurrentWeatherData = () => {
    const locationData = useSelector((state: any) => state.location)
    const dispatch = useDispatch();

    const getCurrentWeather = () => {
        dispatch(fetchWeatherData())
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            navigator.geolocation.getCurrentPosition(async (position) => {
                fetchCurrentWeatheFromAPI(position)
            })
            if(result.state !== 'granted'){
                fetchCurrentWeatheFromAPI({})
            }
        })
    }

    const fetchCurrentWeatheFromAPI = (position: any) => {
        const latitude = getLatitude(position, locationData);
        const longitude = getLongitude(position, locationData);
        getAxios(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${openWeatherKey}`
        ).then((res) => {
            dispatch(setWeatherData(res.data))
        }).catch((err) => {
            dispatch(setErrorinWeather(err.toString()))
        });
    }

    useEffect(() => {
        getCurrentWeather()
    }, [locationData.latitude, locationData.longitude]);

}