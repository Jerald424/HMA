import axiosInstance from 'src/services/axiosInstance';

export async function useInfoApi() {
  return await axiosInstance.post('/api/employee/info', { params: {} });
}

export async function fetchDashboardApi({ id }: { id: number }) {
  return await axiosInstance.get(`/api/employee/${id}/dashboard`, {
    params: {},
  });
}
