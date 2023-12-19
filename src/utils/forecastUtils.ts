import { deafultLatitude, defaultLongitude } from "./constants";

export const getWeatherIcon = (weather: string) => {
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

export const getGradientColor = (avgTemp: number) => {
    if (avgTemp <= 22) {
        return 'linear-gradient(to right, #66a6ff, #007acc)'; // Cold temperature
    } else if (avgTemp > 27) {
        return 'linear-gradient(to right, #ff7f7f, #ff4040)'; // Hot temperature
    } else {
        return 'linear-gradient(to right, #70db70, #33cc33)'; // Moderate temperature
    }
};

export const getLatitude = (position:any, locationData:any) =>{
    if(locationData.latitude){
        return locationData.latitude
    }else if(position?.coords?.latitude){
        return position.coords.latitude
    }else{
        return deafultLatitude
    }
}

export const getLongitude = (position:any, locationData:any) =>{
    if(locationData.longitude){
        return locationData.longitude
    }else if(position?.coords?.longitude){
        return position.coords.longitude
    }else{
        return defaultLongitude
    }
}