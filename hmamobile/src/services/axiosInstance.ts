import axios from 'axios';
import sessionExpires from 'src/function/sessionExpires';
import { IS_ANDROID } from 'src/utils/variables';

const axiosInstance = axios.create({
  timeout: 60000,
  // baseURL: 'https://bse-testing.odoo.com',
  headers: {
    ['Content-Type']: 'application/json',
    Accept: 'application/json',
    version: 1.2,
    source: IS_ANDROID ? 'android' : 'ios',
  },
  responseType: 'json',
});

axiosInstance.interceptors.response.use(
  response => {
    if (response?.data?.result?.status == 'error')
      return Promise.reject(response?.data);
    return response?.data;
  },
  error => {
    console.log('error: ', error, error?.response);
    if (
      !error?.response?.config?.url?.includes('/login') &&
      error?.response?.status == 401
    )
      sessionExpires();
    return Promise.reject(error?.response?.data);
  },
);

export default axiosInstance;
