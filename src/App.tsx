import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { getAxios } from './apis/getAxios';
import { getSevenDayForecast } from './utils/extractForecastData';
import Forecast from './components/Forecast/Forecast';
import WeatherSummary from './components/CurrentWeather/CurrentWeather';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import LocationSearch from './components/LocationSearch/LocationSearch';
import { useSelector } from 'react-redux';
const apiKey = '2df85bb8c5aca7cd14839ff953c2413a';

function App() {
    const [weather, setWeather] = useState<any>(null);
    const [forcast, setForcast] = useState(null);

    const locationData = useSelector((state:any) => state.location)

    const getCurrentWeather = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = locationData.latitude === null ? position.coords.latitude : locationData.latitude;
            const longitude = locationData.longitude === null ? position.coords.longitude : locationData.longitude
            getAxios(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
            ).then((res) => {
                setWeather(res.data)
            }).catch((err) => {
                console.log(err)
            });
        })
    }

    const getForcastData = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = locationData.latitude === null ? position.coords.latitude : locationData.latitude;
            const longitude = locationData.longitude === null ? position.coords.longitude : locationData.longitude
            getAxios(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
            ).then((res) => {
                setForcast(res.data)
            }).catch((err) => {
                console.log(err)
            });
        })
    }

    useEffect(() => {
        getCurrentWeather();
        getForcastData();
    }, [locationData.latitude,locationData.longitude]);

    console.log('weather', weather)
    console.log('forecast', forcast)
    console.log('formatted data', getSevenDayForecast(forcast))
    return (
        <div>
            <LocationSearch />
            {weather && <WeatherSummary weatherData={weather} />}
            <Forecast data={getSevenDayForecast(forcast)} />
        </div>
    );
};

export default App;
