import axios from "axios";

// @create instance
const api = axios.create({
    baseURL : import.meta.env.VITE_APP_API_URL,
    // baseURL: "https://minpro-blog.purwadhikabootcamp.com/api",
    timeout : 5000
})


// @interceptor
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
)

export default api;