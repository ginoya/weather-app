import React from 'react';
import './Forecast.css';

interface Weather {
    date: string;
    minTemp: number;
    maxTemp: number;
    avgTemp: number;
    weather: string;
}

interface WeatherDataProps {
    data: Weather[];
}

const getWeatherIcon = (weather: string) => {
    switch (weather.toLowerCase()) {
        case 'clouds':
            return '☁️';
        case 'clear':
            return '☀️';
        case 'rain':
            return '🌧️';
        case 'thunderstorm':
            return '⛈️';
        case 'snow':
            return '❄️';
        default:
            return '🌦️';
    }
};

const getGradientColor = (avgTemp: number) => {
    if (avgTemp <= 22) {
        return 'linear-gradient(to right, #66a6ff, #007acc)'; // Cold temperature
    } else if (avgTemp > 27) {
        return 'linear-gradient(to right, #ff7f7f, #ff4040)'; // Hot temperature
    } else {
        return 'linear-gradient(to right, #70db70, #33cc33)'; // Moderate temperature
    }
};

const WeatherData: React.FC<WeatherDataProps> = ({ data }) => {
    return (
        <div className="weather-container">
            {data.map((day, index) => (
                <div className="weather-card" key={index} style={{ background: getGradientColor(day.avgTemp) }}>
                    <h3>{day.date}</h3>
                    <div className="weather-icon" style={{ fontSize: '5rem' }}>
                        <span role="img" aria-label="weather-icon">{getWeatherIcon(day.weather)}</span>
                    </div>
                    <p>Min Temp: {day.minTemp}&deg;C</p>
                    <p>Max Temp: {day.maxTemp}&deg;C</p>
                    <p>Avg Temp: {day.avgTemp}&deg;C</p>
                    <p>
                        Weather: {day.weather}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default WeatherData;
