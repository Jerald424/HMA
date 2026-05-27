import axiosInstance from 'src/services/axiosInstance';

export const fetchNotificationApi = async ({
  employee_id,
}: {
  employee_id: number;
}) => {
  return await axiosInstance.get(`/api/notifications/${employee_id}`);
};
