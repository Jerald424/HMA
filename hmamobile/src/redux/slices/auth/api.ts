import axiosInstance from 'src/services/axiosInstance';

export async function useInfoApi() {
  return await axiosInstance.get('/user-info');
}
