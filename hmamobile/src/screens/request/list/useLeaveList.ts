import { useQuery } from '@tanstack/react-query';
import useUserId from 'src/hooks/useUserId';
import axiosInstance from 'src/services/axiosInstance';

const fetchRequestHistory = async ({ id }: { id: number }) => {
  return await axiosInstance.get(`/api/requests/history/${id}`);
};

export default function useRequestList() {
  const id = useUserId();

  const {
    data: requestHistory,
    isLoading: isRequestHistory,
    refetch,
  } = useQuery({
    queryKey: ['fetch/request-history', id],
    queryFn: () => id && fetchRequestHistory({ id }),
  });

  return {
    requestHistory,
    isRequestHistory,
    refetch,
  };
}
