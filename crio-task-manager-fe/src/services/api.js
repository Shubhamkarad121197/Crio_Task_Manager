import axios from "axios";

const api=axios.create({
    baseURL:'http://localhost:8082/api',
    headers:{
        "Content-Type":"Application/json"
    },
    timeout:10000
})

// Interceptors
api.interceptors.request.use(
    (config)=>{
        return config;
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default api;