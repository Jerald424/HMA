import { useQuery } from '@tanstack/react-query';
import useUserId from 'src/hooks/useUserId';
import axiosInstance from 'src/services/axiosInstance';

const fetchLeaveBalance = async ({ id }: { id: number }) => {
  return await axiosInstance.get(`api/employee/${id}/leave-balance`);
};

const fetchLeaveHistory = async ({ id }: { id: number }) => {
  return await axiosInstance.get(`/api/leaves/history/${id}`);
};

export const useFetchLeaveBalance = () => {
  const id = useUserId();

  const { data: leaveBalance, isLoading } = useQuery({
    queryKey: ['fetch/leave-balance', id],
    queryFn: () => id && fetchLeaveBalance({ id }),
  });

  return {
    leaveBalance,
    isLoading,
  };
};

export default function useLeaveList() {
  const id = useUserId();
  const { isLoading, leaveBalance } = useFetchLeaveBalance();

  const {
    data: leaveHistory,
    isLoading: isLoadingHistory,
    refetch,
  } = useQuery({
    queryKey: ['fetch/leave-history', id],
    queryFn: () => id && fetchLeaveHistory({ id }),
  });

  return {
    leaveBalance,
    isLoading,
    leaveHistory,
    isLoadingHistory,
    refetch,
  };
}
