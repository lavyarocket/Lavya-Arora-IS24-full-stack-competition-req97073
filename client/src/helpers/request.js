import axios from "axios";
import { API_BASE } from "constants/domain";

console.log(API_BASE);

//Handle requests sent from frontend
const request = axios.create({
    baseURL: API_BASE
});

export default request;