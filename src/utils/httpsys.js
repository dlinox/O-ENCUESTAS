import axios from "axios";

const httpSys = axios.create({
    baseURL: import.meta.env.URL_API_SYSTEM,
})

export default httpSys;


