import axios from 'axios';
import { getToken } from './libs/localStorage';
const url = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: `${url}/api/v1`, // Your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosInstance.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = `Bearer ${getToken()}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
