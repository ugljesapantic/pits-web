import axios from 'axios';


const http = axios.create ({
    baseURL: process.env.REACT_APP_API,
    headers: {'Content-Type': 'application/json'},
});

http.interceptors.request.use((config) => {
        const token = localStorage.pitsJWT;
        if (token) config.headers.Authorization = token;
        return config;
    },
    (error) =>  Promise.reject (error)
);

export default http;