import axios from "axios"


export const getAxios = (url:string) =>{
    return axios.get(url)
}