import axios from 'axios';

const axiosInstance = axios.create({
    withCredentials: true // Enable sending cookies with every request
});

axiosInstance.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401) {
            } else {
            }
        } else if (error.request) {
        } else {
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
