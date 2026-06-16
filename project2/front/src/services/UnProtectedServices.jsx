import axios from 'axios'

let UnProtectedService = axios.create({
    baseURL : `${import.meta.env.VITE_API_URL}`
});

export default UnProtectedService;