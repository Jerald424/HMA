import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { formDataProps } from 'src/components/styled/organism/form';
import { alertRefProp } from 'src/components/styled/template/modal/alert';
import { updateAuthSlice } from 'src/redux/slices/auth/slice';
import loginApi from './api/loginApi';
import { useAppDispatch } from 'src/redux/hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCOUNTS, BASE_URL, LOGIN_DATA, TOKEN } from 'src/utils/variables';
import axiosInstance from 'src/services/axiosInstance';
import useLoginSuccess from './hooks/useLoginSuccess';

export const assignTokenToAxios = (token: string) => {
  // axiosInstance.defaults.headers[TOKEN] = token;
  axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
};

export const assignTokenToAsyncStorage = (token: string) => {
  AsyncStorage.setItem(TOKEN, token);
};

export const removeTokenFromAxios = () => {
  axiosInstance.defaults.headers[TOKEN] = null;
};

export const removeTokenFromAsyncStorage = () => {
  AsyncStorage.removeItem(TOKEN);
};

export const assignBaseURlToAxios = (url: string) => {
  axiosInstance.defaults.baseURL = url;
};

export const assignBaseURlToAsyncStorage = (url: string) => {
  AsyncStorage.setItem(BASE_URL, url);
};

export default function useLogin() {
  const { onSuccess } = useLoginSuccess();
  const navigation = useNavigation();
  const [accounts, setAccounts] = useState({ url: [], email: [] });
  const [isRemember, setIsRemember] = useState(true);
  const dispatch = useAppDispatch();
  const alertRef = useRef<alertRefProp>(null);
  const { control, handleSubmit, reset } = useForm();
  const { mutate, isPending } = useMutation({
    mutationKey: ['login'],
    mutationFn: loginApi,
  });

  const formData: formDataProps = [
    {
      inputType: 'drop-down',
      name: 'url',
      dropdownProps: {
        placeholder: 'Enter url',
        searchTextInputProps: {
          autoCapitalize: 'none',
          placeholder: 'Enter url',
        },
        options: accounts?.url,
      },
      rules: {
        required: {
          value: true,
          message: 'Url is required',
        },

        validate(val) {
          console.log('val: ', val);
          return /^(https?:\/\/)[^\s"]+$/.test(val?.label)
            ? true
            : 'Enter valid url';
        },
      },
    },
    {
      inputType: 'drop-down',
      name: 'email',
      dropdownProps: {
        placeholder: 'Enter email',
        searchTextInputProps: {
          autoCapitalize: 'none',
          placeholder: 'Enter email',
        },
        options: accounts?.login,
      },
      rules: {
        required: {
          value: true,
          message: 'Email is required',
        },
      },
    },
    {
      inputType: 'input-box',
      name: 'pin',
      textInputProps: {
        placeholder: 'Enter password',
        secureTextEntry: true,
        autoCapitalize: 'none',
      },
      rules: {
        required: {
          value: true,
          message: 'Password is required',
        },
      },
    },
  ];

  const assignAccountsToAS = async (data: any) => {
    try {
      let acVal = accounts;
      if (!acVal?.url?.some(ac => ac?.value == data?.url?.value))
        acVal?.url.push(data?.url);
      if (!acVal?.email?.some(ac => ac?.value == data?.email?.value))
        acVal?.email.push(data?.email);
      await AsyncStorage.setItem(ACCOUNTS, JSON.stringify(acVal));
    } catch (error) {
      console.error(error);
    }
  };

  const revokeAccounts = async () => {
    try {
      let acVal = await AsyncStorage.getItem(ACCOUNTS);
      if (!!acVal) {
        acVal = JSON.parse(acVal);
        console.log('acVal: ', acVal);
        reset({
          url: acVal?.url?.pop?.(),
          email: acVal?.email?.pop?.(),
        });
        setAccounts(acVal);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onLogin = (data: any) => {
    mutate(
      {
        data: { email: data?.email?.value, pin: data?.pin },
        baseURL: data?.url?.value,
      },
      {
        onError(error) {
          console.log('error: ', error);
          alertRef?.current?.showAlert?.({
            message: error?.Message ?? 'Something went wrong',
          });
        },
        onSuccess(response) {
          console.log('#########################', response);
          dispatch(
            updateAuthSlice({ key: 'baseurl', value: data?.url?.value }),
          );
          assignBaseURlToAsyncStorage(data?.url?.value);
          assignBaseURlToAxios(data?.url?.value);
          if (isRemember) assignAccountsToAS(data);

          if (response?.result?.status == 'otp_sent') {
            navigation.navigate('Login Otp', JSON.stringify(response?.result));
            return;
          }
          //################################################
          if (response?.result?.status != 'success')
            return alertRef?.current?.showAlert?.({
              message: response?.result?.message ?? 'Something went wrong',
            });
          onSuccess(response);
        },
      },
    );
  };

  useEffect(() => {
    revokeAccounts();
  }, []);

  return {
    formData,
    control,
    handleSubmit: handleSubmit(onLogin),
    isPending,
    alertRef,
    isRemember,
    setIsRemember,
  };
}
