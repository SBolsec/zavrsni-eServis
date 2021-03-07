import axios from 'axios';
import isAuthenticated from '../utils/isAuthenticated';

const axiosWithHistory = (history = null) => {
    const baseURL = process.env.BACKEND_URL;
    console.log("url", baseURL);

    const axiosInstance = axios.create({
        baseURL: baseURL,
        withCredentials: true,
        headers: localStorage.token ? { 'Authorization': `Bearer ${localStorage.token}` } : {}
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            config.headers.Authorization = localStorage.token ? `Bearer ${localStorage.token}` : '';

            if (isAuthenticated()) {
                try {
                    const response = await fetch(baseURL + '/token', {
                        method: 'POST',
                        credentials: 'include'
                    });
                    const json = await response.json();
                    if (json && json.ok) {
                        localStorage.token = json.accessToken;
                        config.headers.Authorization = `Bearer ${json.accessToken}`;
                    }
                    
                    console.log('axios', json);
                } catch (error) {
                    console.error(error);
                }
            }

            return config;
        }, function (error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use((response) => {
        console.log('response', response);
        return response;
    }, (error) => {
        if (!error.response) {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }

        if (error.response.status === 403) {
            localStorage.removeItem("token");

            if (history) {
                history.push("/login");
            } else {
                window.location = "/login";
            }
        } else {
            return new Promise((resolve, reject) => {
                reject(error);
            });
        }
    });

    return axiosInstance;
}

export default axiosWithHistory;