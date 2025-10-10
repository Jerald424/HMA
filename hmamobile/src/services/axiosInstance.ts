import axios from 'axios';

const axiosInstance = axios.create({
  timeout: 60000,
  baseURL: 'https://aneequlhaq-basic-elements-pre-prod-24313113.dev.odoo.com',
});

axiosInstance.interceptors.response.use(
  response => {
    return response?.data;
  },
  error => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
