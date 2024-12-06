import axios from "axios";
import Cookies from "js-cookie";


const token = Cookies.get('access_token')

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URI,
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${token}`
    }
})


export default api;