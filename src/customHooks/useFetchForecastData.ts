import { useDispatch, useSelector } from "react-redux";
import { getAxios } from "../apis/getAxios";
import { fetchForecastData, setErrorinForecast, setForecastData } from "../redux/Weather/WeatherActions";
import { useEffect } from "react";
import { openWeatherKey } from "../utils/constants";
import { extractDailyData } from "../utils/extractForecastData";

export const useFetchForecastData = () => {
    const locationData = useSelector((state: any) => state.location)
    const dispatch = useDispatch();

    const getForcastData = () => {
        dispatch(fetchForecastData())
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = locationData.latitude === null ? position.coords.latitude : locationData.latitude;
            const longitude = locationData.longitude === null ? position.coords.longitude : locationData.longitude
            getAxios(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${openWeatherKey}`
            ).then((res) => {
                dispatch(setForecastData(extractDailyData(res.data)))
            }).catch((err) => {
                dispatch(setErrorinForecast(err.toString()))
            });
        })
    }

    useEffect(() => {
        getForcastData()
    }, [locationData.latitude, locationData.longitude]);

}