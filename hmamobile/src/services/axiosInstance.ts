import axios from 'axios';
import sessionExpires from 'src/function/sessionExpires';

const axiosInstance = axios.create({
  timeout: 60000,
  // baseURL: 'https://bse-testing.odoo.com',
  headers: {
    ['Content-Type']: 'application/json',
    Accept: 'application/json',
  },
  responseType: 'json',
});

axiosInstance.interceptors.response.use(
  response => {
    return response?.data;
  },
  error => {
    // console.log('error: ', error, error?.response);
    // if (
    //   !error?.response?.config?.url?.includes('/login') &&
    //   error?.response?.status == 401
    // )
    //   sessionExpires();
    return Promise.reject(error?.response?.data);
  },
);

export default axiosInstance;
