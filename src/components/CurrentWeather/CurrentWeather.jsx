import React from 'react';
import './CurrentWeather.css';
import {convertedToCelcius} from './../../utils/extractForecastData';

const WeatherSummary = ({ weatherData }) => {
  const { main, weather, wind, sys, name } = weatherData;

  return (
    <div className="weather-summary">
      <h2 className="header">Weather Summary for {name}</h2>
      <div className="weather-details">
        <p className="info">Temperature: {convertedToCelcius(main.temp)}°C</p>
        <p className="info">Feels Like: {convertedToCelcius(main.feels_like)}°C</p>
        <p className="info">Description: {weather[0].description}</p>
        <p className="info">Wind Speed: {wind.speed} m/s</p>
        <p className="info">Country: {sys.country}</p>
      </div>
    </div>
  );
};

export default WeatherSummary;
