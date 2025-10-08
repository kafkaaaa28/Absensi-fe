import axios from 'axios';

// const api = axios.create({
//     baseURL: process.env.REACT_APP_BASE_URL,
//   withCredentials: true,
// });
const isDevelopment = window.location.hostname === 'localhost';

const baseURL = isDevelopment ? 'http://localhost:5000/api' : 'http://192.168.100.230:5000/api';

const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/';
    }
    return Promise.reject(err);
  }
);

export default api;
