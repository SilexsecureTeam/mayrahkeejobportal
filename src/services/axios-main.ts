import axios from "axios";
import { BASE_URL } from "../utils/base";

 const MainAxios = axios.create({
    baseURL: BASE_URL,
    timeout: 60000,
    withCredentials: false,

});

export default MainAxios;