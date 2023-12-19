import { useState } from 'react';
import { AutoComplete } from "primereact/autocomplete";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setLocationCoordinates, setLocationName } from '../../redux/Location/LocationActions';
import { locationKey } from '../../utils/constants';

export default function LocationSearch() {

    const dispatch = useDispatch()
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [locationSuggestions, setLocationSuggestions] = useState<any[]>([]);

    const search = (event: any) => {
        axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${event.query}&key=${locationKey}`)
            .then(res => {
                setLocationSuggestions(res.data.results.map((location: any) => {
                    return {
                        name: location.formatted,
                        value: JSON.stringify(location.geometry)
                    }
                }))
            }).catch(err => {
                console.log('err', err)
            })
    }

    const handleOnChange = (e: any) => {
        dispatch(setLocationName(e.value.name))
        const selectedCoordinates = JSON.parse(e.value.value)
        dispatch(setLocationCoordinates({
            lat: selectedCoordinates.lat,
            long: selectedCoordinates.lng
        }))
    }

    return (
        <AutoComplete delay={1200} panelStyle={{ width: "70vw" }} inputStyle={{ width: "70vw", marginLeft: "15vw", marginTop: "10px" }} minLength={2}
            field="name" value={selectedLocation} suggestions={locationSuggestions}
            placeholder='Start typing location name to get latest weather details'
            completeMethod={search} onSelect={handleOnChange} onChange={(e) => setSelectedLocation(e.value)} />
    )
}
