
export const SET_LOCATION_NAME = 'SET_LOCATION_NAME';

export const SET_LOCATION_COORDINATES = 'SET_LOCATION_COORDINATES';
 
export const setLocationName = (location:string) =>{
    return {
        type:SET_LOCATION_NAME,
        payload:location
    }
}

export const setLocationCoordinates = (coordinates:any) =>{
    return {
        type:SET_LOCATION_COORDINATES,
        payload:coordinates
    }
}