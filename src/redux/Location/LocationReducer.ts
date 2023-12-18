import { SET_LOCATION_COORDINATES, SET_LOCATION_NAME } from "./LocationActions"

const initState = {
    name : '',
    latitude: null,
    longitude: null
}

const LocationReducer = (state:any = initState, action:any) =>{
    switch(action.type){
        case SET_LOCATION_NAME:{
            return {
                ...state,
                name:action.payload
            }
        }
        case SET_LOCATION_COORDINATES:{
            return {
                ...state,
                latitude:action.payload.lat,
                longitude:action.payload.long
            }
        }
        default:
            return state
    }
}

export default LocationReducer