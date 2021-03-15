import axios from 'axios';
import isAuthenticated from '../utils/isAuthenticated';
import { PREFIX } from '../constants/global';

const getToken = () => {
    return localStorage.getItem(PREFIX + 'token');
}

const axiosWithHistory = (history = null) => {
    const baseURL = 'https://eservis.herokuapp.com';

    const axiosInstance = axios.create({
        baseURL: baseURL,
        withCredentials: true,
        headers: localStorage.token ? { 'Authorization': `Bearer ${getToken()}` } : {}
    });

    axiosInstance.interceptors.request.use(
        async (config) => {
            config.headers.Authorization = getToken() ? `Bearer ${getToken()}` : '';

            if (isAuthenticated()) {
                try {
                    const response = await fetch(baseURL + '/token', {
                        method: 'POST',
                        credentials: 'include'
                    });
                    const json = await response.json();
                    if (json && json.ok) {
                        localStorage.setItem(PREFIX + 'token', json.accessToken);
                        config.headers.Authorization = `Bearer ${json.accessToken}`;
                    }
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