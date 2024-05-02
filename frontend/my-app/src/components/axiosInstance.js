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

// const navigate = useNavigate();
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            if (error.response.status === 401 || error.response.status === 403) {
                console.log("Not allowed bruh")
                window.location.replace('/')
            } else {
                // TODO: switch to switch for handling errors 403 - wrong resource
            }
        } else if (error.request) {
        } else {
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
