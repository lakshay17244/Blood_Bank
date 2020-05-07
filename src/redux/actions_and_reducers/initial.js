import axios from 'axios';
const URL = process.env.NODE_ENV === 'development' ? "http://127.0.0.1:5000/" : "https://dbmsbloodbank.herokuapp.com/"
axios.defaults.baseURL = URL

axios.interceptors.request.use(
    async config => {
        if (config.baseURL === URL && !config.headers.Authorization) {
            const token = localStorage.getItem("access_token")
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }

        return config;
    },
    error => Promise.reject(error)
);

export default axios;




