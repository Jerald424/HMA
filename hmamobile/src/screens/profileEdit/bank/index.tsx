import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView } from 'react-native';
import HMAButton from 'src/components/styled/atoms/button';
import Container from 'src/components/styled/atoms/container';
import Toast, { toastRefFn } from 'src/components/styled/atoms/toast';
import HMAModalLoader from 'src/components/styled/molecules/loader/modalLoader';
import HMAForm, { formDataProps } from 'src/components/styled/organism/form';
import useUserId from 'src/hooks/useUserId';
import { useProfileInfo } from 'src/redux/hooks';
import useProfile from 'src/screens/profile/useProfile';
import axiosInstance from 'src/services/axiosInstance';

// {
// 	“Account_number”: “00112233567”,
// 	“Account_holder”: “Himanshu Testing”
// }

const updateBankApi = async ({
  employee_id,
  payload,
}: {
  employee_id: number;
  payload: any;
}) => {
  await axiosInstance.put(`/api/employee/${employee_id}/bank-details`, payload);
};
export default function BankEdit({ navigation }) {
  const employee_id = useUserId();
  const toastRef = useRef<toastRefFn>(null);
  const { data } = useProfileInfo();
  const { fetchProfile } = useProfile();
  const { control, handleSubmit } = useForm();

  const { mutate: updateBankMutate, isPending: isLoadingPersonal } =
    useMutation({
      mutationKey: ['update/bank-api'],
      mutationFn: updateBankApi,
    });

  const onSubmit = (data: any) => {
    updateBankMutate(
      { payload: data, employee_id },
      {
        onSuccess(data) {
          console.log('data: ', data);
          toastRef.current?.showToast?.('Bank updated successfully', 'success');
          fetchProfile();
          setTimeout(() => {
            navigation?.goBack?.();
          }, 500);
        },
        onError(error) {
          console.log('error: ', error);
          toastRef.current?.showToast?.(
            error?.message ?? 'Something went wrong',
            'error',
          );
        },
      },
    );
  };

  const formData: formDataProps = [
    {
      inputType: 'input-box',
      name: 'account_number',
      textInputProps: {
        placeholder: 'Enter Account number',
      },
      rules: {
        required: {
          value: true,
          message: 'Account number is required',
        },
      },
    },
    {
      inputType: 'input-box',
      name: 'account_holder',
      textInputProps: {
        placeholder: 'Enter account holder phone',
      },
      rules: {
        required: {
          value: true,
          message: 'Account holder is required',
        },
      },
    },
  ];

  return (
    <Container backgroundColor="background">
      <ScrollView showsVerticalScrollIndicator={false}>
        <HMAForm data={formData} control={control} />
      </ScrollView>
      <HMAButton title="Submit" onPress={handleSubmit(onSubmit)} />
      <Toast ref={toastRef} showMs={10000} />
      <HMAModalLoader isVisible={isLoadingPersonal} />
    </Container>
  );
}
