import { useSelector } from 'react-redux';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useFetchForecastData } from '../../customHooks/useFetchForecastData';
import { getGradientColor, getWeatherIcon } from '../../utils/forecastUtils';
import './Forecast.css';

const Forecast = () => {
    const ForecastData = useSelector((state: any) => state.weatherData.forecast.data)
    const isForecastDataLoading = useSelector((state: any) => state.weatherData.forecast.loading)
    const errorInForecast = useSelector((state: any) => state.weatherData.forecast.error)

    useFetchForecastData();

    return (
        <>
            {
                isForecastDataLoading ?
                    <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
                    :
                    errorInForecast ?
                        <h3 className='forecast-error'>{errorInForecast}</h3>
                        :
                        <div className="weather-container">
                            {ForecastData.map((day: any, index: any) => (
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
            }
        </>
    );
};

export default Forecast;
