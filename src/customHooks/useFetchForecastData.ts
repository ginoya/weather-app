import { useDispatch, useSelector } from "react-redux";
import { getAxios } from "../apis/getAxios";
import { fetchForecastData, setErrorinForecast, setForecastData } from "../redux/Weather/WeatherActions";
import { useEffect } from "react";
import { openWeatherKey } from "../utils/constants";
import { extractDailyData } from "../utils/extractForecastData";
import { getLatitude, getLongitude } from "../utils/forecastUtils";

export const useFetchForecastData = () => {
    const locationData = useSelector((state: any) => state.location)
    const dispatch = useDispatch();

    const getForcastData = () => {
        dispatch(fetchForecastData())

        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            navigator.geolocation.getCurrentPosition(async (position) => {
                fetchForecastDataFromAPI(position)
            })
            if(result.state !== 'granted'){
                fetchForecastDataFromAPI({})
            }
        })
    }

    const fetchForecastDataFromAPI = (position:any) =>{
        const latitude = getLatitude(position, locationData);
        const longitude = getLongitude(position, locationData);
        getAxios(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${openWeatherKey}`
        ).then((res) => {
            dispatch(setForecastData(extractDailyData(res.data)))
        }).catch((err) => {
            dispatch(setErrorinForecast(err.toString()))
        });
    }

    useEffect(() => {
        getForcastData()
    }, [locationData.latitude, locationData.longitude]);

}