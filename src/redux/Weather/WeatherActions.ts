export const FETCH_WEATHER_DATA = 'FETCH_WEATHER_DATA'
export const SET_WEATHER_DATA = 'SET_WEATHER_DATA'
export const ERROR_WEATHER_DATA = 'ERROR_WEATHER_DATA'

export const FETCH_FORECAST_DATA = 'FETCH_FORECAST_DATA'
export const SET_FORECAST_DATA = 'SET_FORECAST_DATA'
export const ERROR_FORECAST_DATA = 'ERROR_FORECAST_DATA'

export const setWeatherData = (payload:any) =>{
    return {
        type : SET_WEATHER_DATA,
        payload : payload
    }
}

export const setForecastData = (payload:any) =>{
    return {
        type : SET_FORECAST_DATA,
        payload : payload
    }
}

export const fetchWeatherData = () =>{
    return {
        type : FETCH_WEATHER_DATA
    }
}

export const fetchForecastData = () =>{
    return {
        type : FETCH_FORECAST_DATA
    }
}

export const setErrorinWeather = (payload:string) =>{
    return {
        type : ERROR_WEATHER_DATA,
        payload : payload
    }
}

export const setErrorinForecast = (payload:string) =>{
    return {
        type : ERROR_FORECAST_DATA,
        payload : payload
    }
}