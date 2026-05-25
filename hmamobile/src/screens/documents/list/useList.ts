import { useQuery } from '@tanstack/react-query';
import useUserId from 'src/hooks/useUserId';
import axiosInstance from 'src/services/axiosInstance';

const fetchDocuments = async ({ employee_id }: { employee_id: number }) => {
  return await axiosInstance.get(`/api/documents/${employee_id}`);
};

export default function useList() {
  const employee_id = useUserId();
  const { data, isPending, refetch } = useQuery({
    queryKey: ['fetch/documents', employee_id],
    queryFn: () => employee_id && fetchDocuments({ employee_id }),
  });

  return {
    data,
    isPending,
    refetch,
  };
}
