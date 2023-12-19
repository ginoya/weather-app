import { convertedToCelcius } from '../../utils/extractForecastData';
import { useFetchCurrentWeatherData } from '../../customHooks/useFetchCurrentWeatherData';
import { useSelector } from 'react-redux';
import { ProgressSpinner } from 'primereact/progressspinner';
import './CurrentWeather.css';

const WeatherSummary = () => {

  const weatherData = useSelector((state:any) => state.weatherData.currentWeather.data)
  const isWeatherDataLoading = useSelector((state:any) => state.weatherData.currentWeather.loading)
  const errorInWeather = useSelector((state:any) => state.weatherData.currentWeather.error)

  useFetchCurrentWeatherData();

  const { main, weather, wind, sys, name } = weatherData;

  return (
    <>{
      isWeatherDataLoading ?
        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
        : errorInWeather ?
          <h3 className='current-weather-error'>{errorInWeather}</h3>
          :
          <div className="weather-summary">
            <h2 className="header">Weather Summary for {name}</h2>
            <div className="weather-details">
              <p className="info">Temperature: {convertedToCelcius(main?.temp)}°C</p>
              <p className="info">Feels Like: {convertedToCelcius(main?.feels_like)}°C</p>
              <p className="info">Description: {weather?.[0]?.description}</p>
              <p className="info">Wind Speed: {wind?.speed} m/s</p>
              <p className="info">Country: {sys?.country}</p>
            </div>
          </div>
    }
    </>
  );
};

export default WeatherSummary;
