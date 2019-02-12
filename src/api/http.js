import axios from 'axios';

    // TODO, generic, non hardcoded
const http = axios.create ({
    baseURL: 'http://localhost:3000',
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