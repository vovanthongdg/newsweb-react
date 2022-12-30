import axios from "axios";

const getApi = axios.create({
    baseURL: 'http://3.0.209.240/api/',
    headers:{
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",

    }
    // headers: {
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    // }
})

export default getApi;
