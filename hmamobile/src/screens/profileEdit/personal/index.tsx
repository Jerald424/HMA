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
// 	“Phone”: “+999999999999”,
// 	“Mobile_phone”: “+111111111111111”
// }

const updatePersonalApi = async ({
  employee_id,
  payload,
}: {
  employee_id: number;
  payload: any;
}) => {
  await axiosInstance.patch(`/api/employee/${employee_id}/profile`, payload);
};

export default function PersonalEdit({ navigation }) {
  const employee_id = useUserId();
  const toastRef = useRef<toastRefFn>(null);
  const { data } = useProfileInfo();
  const { fetchProfile } = useProfile();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      phone: data?.profile?.personal?.fields?.phone,
      mobile_phone: data?.profile?.contact?.fields?.mobile_phone,
    },
  });

  const { mutate: updatePersonalMutate, isPending: isLoadingPersonal } =
    useMutation({
      mutationKey: ['update/personal'],
      mutationFn: updatePersonalApi,
    });

  const onSubmit = (data: any) => {
    updatePersonalMutate(
      { payload: data, employee_id },
      {
        onSuccess(data) {
          console.log('data: ', data);
          toastRef.current?.showToast?.(
            'Profile updated successfully',
            'success',
          );
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
      name: 'phone',
      textInputProps: {
        placeholder: 'Enter phone',
        inputMode: 'tel',
      },
      rules: {
        required: {
          value: true,
          message: 'Phone is required',
        },
      },
    },
    {
      inputType: 'input-box',
      name: 'mobile_phone',
      textInputProps: {
        placeholder: 'Enter mobile phone',
        inputMode: 'tel',
      },
      rules: {
        required: {
          value: true,
          message: 'Mobile phone is required',
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
