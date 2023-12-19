import Forecast from './components/Forecast/Forecast';
import WeatherSummary from './components/CurrentWeather/CurrentWeather';
import LocationSearch from './components/LocationSearch/LocationSearch';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import './App.css';

function App() {

    return (
        <div className='weather-app'>
            <LocationSearch />
            <WeatherSummary />
            <Forecast  />
        </div>
    );
};

export default App;
