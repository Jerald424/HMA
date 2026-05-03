import { useQuery } from '@tanstack/react-query';
import useUserId from 'src/hooks/useUserId';
import axiosInstance from 'src/services/axiosInstance';

const fetchLeaveBalance = async ({ id }: { id: number }) => {
  return await axiosInstance.get(`api/employee/${id}/leave-balance`);
};

export default function useLeaveList() {
  const id = useUserId();

  const { data: leaveBalance, isLoading } = useQuery({
    queryKey: ['fetch/leave-balance', id],
    queryFn: () => id && fetchLeaveBalance({ id }),
  });
  console.log('leaveBalance: ', leaveBalance);
  return {
    leaveBalance,
    isLoading,
  };
}
