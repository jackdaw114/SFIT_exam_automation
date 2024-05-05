import axios from 'axios';



const axiosInstance = axios.create({
    withCredentials: true,
    errorOverlay: false,
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
            } else if (error.response.status === 500) {
                alert("internal Server Error")

            }
            else {
                alert("error")
            }

        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
