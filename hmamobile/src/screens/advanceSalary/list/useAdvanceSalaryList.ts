import { useQuery } from '@tanstack/react-query';
import useUserId from 'src/hooks/useUserId';
import axiosInstance from 'src/services/axiosInstance';

const fetchSalaryList = async (userId: number) => {
  return await axiosInstance.get(`/api/employee/${userId}/salary-advance`); ///api/employee/<int:employee_id>/salary-advance
};

export default function useAdvanceSalaryList() {
  const userId = useUserId();
  const {
    data,
    isPending: isLoading,
    refetch,
  } = useQuery({
    queryKey: ['fetch/advance-salary', userId],
    enabled: !!userId,
    queryFn: () => fetchSalaryList(userId),
  });
  return { data: data?.data, isLoading, refetch };
}
