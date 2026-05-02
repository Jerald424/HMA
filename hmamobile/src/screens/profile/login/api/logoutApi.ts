import axiosInstance from 'src/services/axiosInstance';

export default async function logoutApi() {
  return await axiosInstance.post('/api/employee/logout', { params: {} });
}
