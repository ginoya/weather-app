import { useState } from 'react';
import { AutoComplete } from "primereact/autocomplete";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLocationCoordinates, setLocationName } from '../../redux/Location/LocationActions';

export default function LocationSearch() {

    const dispatch = useDispatch()
    const locationData = useSelector(state=>state);
    console.log("redux location",locationData)
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);

    const search = (event:any) => {
        console.log('search called', event.query)
        axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${event.query}&key=ed02d70cad8f4a95a9b1a11df75b3792`)
        .then(res=>{
            setLocationSuggestions(res.data.results.map((location:any)=>{return {
                name:location.formatted,
                value: JSON.stringify(location.geometry) 
            }}))
        }).catch(err=>{
            console.log('err',err)
        })
            
    }

    const handleOnChange = (e:any) =>{
        console.log('test', e.value)
        console.log(e.value)
        dispatch(setLocationName(e.value.name))

        const selectedCoordinates = JSON.parse(e.value.value)
        dispatch(setLocationCoordinates({
            lat:selectedCoordinates.lat,
            long:selectedCoordinates.lng
        }))
        console.log(JSON.parse(e.value.value))
    }

    return (
            <AutoComplete delay={1200} panelStyle={{width:"70vw"}} inputStyle={{width:"70vw", marginLeft:"15vw", marginTop:"10px"}} minLength={2} 
            field="name" value={selectedLocation} suggestions={locationSuggestions} 
            placeholder='Start typing location name to get latest weather details'
            completeMethod={search} onSelect={handleOnChange} onChange={(e)=>setSelectedLocation(e.value)} />
    )
}
