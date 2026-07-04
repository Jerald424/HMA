import { useQuery } from '@tanstack/react-query';
import useUserId from 'src/hooks/useUserId';
import axiosInstance from 'src/services/axiosInstance';

const fetchExpensesApi = async ({ employee_id }: { employee_id: number }) => {
  return await axiosInstance.get(`/api/expenses/${employee_id}`);
};

export default function useExpenses() {
  const employee_id = useUserId();
  const {
    data: expenses,
    isLoading: isLoadingExpenses,
    refetch,
  } = useQuery({
    queryKey: ['fetch/my-expenses'],
    queryFn: () => fetchExpensesApi({ employee_id }),
  });

  return {
    expenses,
    isLoadingExpenses,
    refetch,
  };
}
