import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import { useLayoutEffect, useState } from 'react';
import {
  assignBaseURlToAsyncStorage,
  assignBaseURlToAxios,
  assignSessionToAsyncStorage,
  assignSessionToAxios,
  assignTokenToAxios,
} from 'src/screens/login/useLogin';
import { BASE_URL, LOGIN_DATA, SESSION, TOKEN } from 'src/utils/variables';
import verifyApi from './verifyApi';
import { useAppDispatch } from 'src/redux/hooks';
import { updateAuthSlice } from 'src/redux/slices/auth/slice';
import { userLogin } from 'src/screens/loginOtp/useOtp';

export default function useInitial() {
  const [isReady, setIsReady] = useState(false);
  const dispatch = useAppDispatch();
  const { mutate: verifyMutate, isPending } = useMutation({
    mutationKey: ['verify-token'],
    mutationFn: verifyApi,
  });

  const { mutate: loginMutate, isPending: isLoginMutate } = useMutation({
    mutationKey: ['user/login'],
    mutationFn: userLogin,
  });

  const checkToken = async () => {
    const token = await AsyncStorage.getItem(TOKEN);
    const url = await AsyncStorage.getItem(BASE_URL);
    const session = await AsyncStorage.getItem(SESSION);
    if (token && url && session) {
      verifyMutate(
        { token, url },
        {
          onSuccess(response) {
            loginMutate(
              {
                token,
              },
              {
                onSuccess(loginData) {
                  console.log('response: ', response);
                  console.log('loginData: ', loginData);
                  dispatch(updateAuthSlice({ key: 'baseurl', value: url }));
                  assignBaseURlToAsyncStorage(url);
                  assignBaseURlToAxios(url);
                  assignTokenToAxios(token);
                  assignSessionToAsyncStorage(loginData?.result?.session);
                  assignSessionToAxios(loginData?.result?.session);
                  dispatch(updateAuthSlice({ key: 'isLogin', value: true }));
                },
                onError(error) {
                  console.log('LOGIN ERROR: ', error);
                },
              },
            );
          },
          onSettled() {
            setIsReady(true);
          },
          onError(error) {
            console.log('ERROR: ', error);
            AsyncStorage.multiRemove([TOKEN, LOGIN_DATA]);
          },
        },
      );
    } else setIsReady(true);
  };

  useLayoutEffect(() => {
    checkToken();
  }, []);

  return {
    isLoadingInitial: isPending || !isReady || isLoginMutate,
  };
}
