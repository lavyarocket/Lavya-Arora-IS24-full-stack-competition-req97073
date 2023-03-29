import axios from "axios";
import { API_BASE } from "constants/domain";

console.log(API_BASE);

const request = axios.create({
    baseURL: API_BASE
});

export default request;