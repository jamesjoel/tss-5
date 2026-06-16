import axios from 'axios'

let ProtectedService = axios.create({
    baseURL : `${import.meta.env.VITE_API_URL}`
});
ProtectedService.interceptors.request.use((config)=>{
    const token = localStorage.getItem("access-token");
    config.headers.Authorization = token;
    return config;
})

export default ProtectedService;