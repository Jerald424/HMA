import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { formDataProps } from 'src/components/styled/organism/form';
import axiosInstance from 'src/services/axiosInstance';
import loginApi from './api/loginApi';

export default function useLogin() {
  const { control, handleSubmit } = useForm();
  const { mutate, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginApi,
  });

  const formData: formDataProps = [
    {
      inputType: 'input-box',
      name: 'login',
      textInputProps: { placeholder: 'Enter username' },
      rules: {
        required: {
          value: true,
          message: 'Username is required',
        },
      },
    },
    {
      inputType: 'input-box',
      name: 'password',
      textInputProps: { placeholder: 'Enter password' },
      rules: {
        required: {
          value: true,
          message: 'Password is required',
        },
      },
    },
  ];

  const onLogin = (data: any) => {
    mutate(
      { data },
      {
        onError() {},
        onSuccess() {},
      },
    );
  };

  return {
    formData,
    control,
    handleSubmit: handleSubmit(onLogin),
    isPending,
  };
}
