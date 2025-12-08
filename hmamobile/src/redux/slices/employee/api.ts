import axiosInstance from 'src/services/axiosInstance';

export async function employeesListApi() {
  const data = await axiosInstance.get('/api/employee-list', {
    timeout: 0,
  });

  return data;
}
