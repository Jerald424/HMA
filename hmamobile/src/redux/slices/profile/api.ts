import axiosInstance from 'src/services/axiosInstance';

export const getProfile = async ({ employee_id }: { employee_id: number }) => {
  return await axiosInstance.get(`api/employee/${employee_id}/profile`);
};
