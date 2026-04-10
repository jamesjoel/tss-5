import axios from 'axios';

let ProtectedService = axios.create({
    baseURL : `${import.meta.env.VITE_API_URL}`
})

export default ProtectedService;