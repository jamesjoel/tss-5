import axios from 'axios';

let UnProtactedService = axios.create({
    baseURL : `${import.meta.env.VITE_API_URL}`
})

export default UnProtactedService;