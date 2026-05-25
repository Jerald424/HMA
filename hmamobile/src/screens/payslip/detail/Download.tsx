import { useMutation } from '@tanstack/react-query';
import { Alert, Linking } from 'react-native';
import HMAButton from 'src/components/styled/atoms/button';
import axiosInstance from 'src/services/axiosInstance';

const downloadPayslip = async ({ payslip_id }: { payslip_id: number }) => {
  return await axiosInstance.get(`/api/payslips/${payslip_id}/access`);
};

export default function Download({ payslip }: { payslip: any }) {
  const { mutate, isPending } = useMutation({
    mutationKey: ['download/payslip'],
    mutationFn: downloadPayslip,
  });

  const handleDownload = () => {
    mutate(
      { payslip_id: payslip?.payslip_id },
      {
        async onSuccess(data) {
          const url = data?.view_url;
          Linking.openURL(url);
        },
        onError(error) {
          Alert.alert(String(error?.message || 'Something went wrong'));
        },
      },
    );
  };
  return (
    <HMAButton
      onPress={handleDownload}
      isLoading={isPending}
      title="Download Payslip"
    />
  );
}
