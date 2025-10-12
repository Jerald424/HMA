import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { formDataProps } from 'src/components/styled/organism/form';
import { alertRefProp } from 'src/components/styled/template/modal/alert';
import { updateAuthSlice } from 'src/redux/slices/auth/slice';
import loginApi from './api/loginApi';
import { useAppDispatch } from 'src/redux/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_DATA, TOKEN } from 'src/utils/variables';
import axiosInstance from 'src/services/axiosInstance';

export const assignTokenToAxios = (token: string) => {
  axiosInstance.defaults.headers[TOKEN] = token;
};

const assignTokenToAsyncStorage = (token: string) => {
  AsyncStorage.setItem(TOKEN, token);
};

export default function useLogin() {
  const dispatch = useAppDispatch();
  const alertRef = useRef<alertRefProp>(null);
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
        onError(error) {
          alertRef?.current?.showAlert?.({
            message: error?.Message ?? 'Something went wrong',
          });
        },
        onSuccess(data) {
          AsyncStorage.setItem(LOGIN_DATA, JSON.stringify(data));
          assignTokenToAsyncStorage(data?.token);
          assignTokenToAxios(data?.token);
          dispatch(updateAuthSlice({ key: 'isLogin', value: true }));
        },
      },
    );
  };

  return {
    formData,
    control,
    handleSubmit: handleSubmit(onLogin),
    isPending,
    alertRef,
  };
}
