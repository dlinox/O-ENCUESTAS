import axios from "axios";

const http = axios.create({
    baseURL: import.meta.env.VITE_APP_API_BASE_URL,

});
// VITE_APP_API_URL="http://38.43.133.27/SURVEYS/v1/"
// VITE_APP_API_BASE_URL="http://38.43.133.27/"
// http://38.43.133.27
export default http;


