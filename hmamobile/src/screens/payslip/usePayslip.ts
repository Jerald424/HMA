import { useMutation, useQuery } from '@tanstack/react-query';
import useUserId from 'src/hooks/useUserId';
import axiosInstance from 'src/services/axiosInstance';

export async function getPayslips(employee_id: string | number) {
  return axiosInstance.get(`/api/payslips/${employee_id}`);
}

export default function usePayslip() {
  const userId = useUserId();
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['payslips', userId],
    queryFn: () => getPayslips(userId),
    enabled: !!userId,
  });

  return {
    data,
    refetch,
    isLoading,
  };
}
