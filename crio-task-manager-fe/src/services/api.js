import axios from "axios";

const api=axios.create({
    baseURL:'https://crio-task-manager-8zpk.onrender.com/api/tasks/api',
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