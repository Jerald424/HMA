import { useQuery } from '@tanstack/react-query';
import axiosInstance from 'src/services/axiosInstance';

const getLastRecord = async () => {
  const url = `/attendance-list?offset=0&limit=1`;
  const response = await axiosInstance.get(url);
  return response;
};
export default function useLastAttendanceRecord() {
  const { data, refetch } = useQuery({
    queryKey: ['get/last-attendance-record'],
    queryFn: getLastRecord,
  });

  return {
    data: data?.records?.[0],
    refetch,
  };
}
