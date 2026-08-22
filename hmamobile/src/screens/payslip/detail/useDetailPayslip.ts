import { useQuery } from '@tanstack/react-query';
import axiosInstance from 'src/services/axiosInstance';

const fetchDetailPayslip = async (payslip_id: string) => {
  return await axiosInstance.get(`/api/payslips/${payslip_id}/detail`);
};

export default function useDetailPayslip(params: any) {
  const { data, isLoading } = useQuery({
    queryKey: ['payslip/detail', params?.payslip_id],
    queryFn: () => fetchDetailPayslip(params?.payslip_id),
    enabled: !!params?.payslip_id,
  });

  return {
    data,
    isLoading,
  };
}
