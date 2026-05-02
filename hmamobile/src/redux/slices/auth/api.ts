import axiosInstance from 'src/services/axiosInstance';

export async function useInfoApi() {
  return await axiosInstance.post('/api/employee/info', { params: {} });
}
