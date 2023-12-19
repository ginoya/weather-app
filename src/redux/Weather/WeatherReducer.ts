import { SET_WEATHER_DATA, SET_FORECAST_DATA, FETCH_WEATHER_DATA, ERROR_WEATHER_DATA, FETCH_FORECAST_DATA, ERROR_FORECAST_DATA } from "./WeatherActions"

const initState = {
    currentWeather: {
        loading: false,
        data: {},
        error: ''
    },
    forecast: {
        loading: false,
        data: [],
        error: ''
    }
}

const WeatherReducer = (state: any = initState, action: any) => {
    switch (action.type) {
        case FETCH_WEATHER_DATA: {
            return {
                ...state,
                currentWeather: {
                    loading: true,
                    data : {},
                    error: ''
                }
            }
        }
        case SET_WEATHER_DATA: {
            return {
                ...state,
                currentWeather: {
                    loading: false,
                    data: action.payload,
                    error: ''
                }
            }
        }
        case ERROR_WEATHER_DATA: {
            return {
                ...state,
                currentWeather: {
                    loading: false,
                    data : {},
                    error: action.payload
                }
            }
        }
        case FETCH_FORECAST_DATA: {
            return {
                ...state,
                forecast: {
                    loading: true,
                    data : [],
                    error: ''
                }
            }
        }
        case SET_FORECAST_DATA: {
            return {
                ...state,
                forecast: {
                    loading: false,
                    data: action.payload,
                    error: ''
                }
            }
        }
        case ERROR_FORECAST_DATA: {
            return {
                ...state,
                forecast: {
                    loading: false,
                    data : [],
                    error: action.payload
                }
            }
        }
        default:
            return state
    }
}

export default WeatherReducer