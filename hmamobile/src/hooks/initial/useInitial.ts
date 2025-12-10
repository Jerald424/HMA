import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useLayoutEffect, useState } from 'react';
import {
  assignBaseURlToAsyncStorage,
  assignBaseURlToAxios,
  assignTokenToAxios,
} from 'src/screens/login/useLogin';
import { BASE_URL, LOGIN_DATA, TOKEN } from 'src/utils/variables';
import verifyApi from './verifyApi';
import { useAppDispatch } from 'src/redux/hooks';
import { updateAuthSlice } from 'src/redux/slices/auth/slice';
import { useNetInfo } from '@react-native-community/netinfo';

export default function useInitial() {
  const [isMount, setIsMount] = useState(false);
  const { isConnected } = useNetInfo();
  const dispatch = useAppDispatch();
  const {
    data,
    mutate: verifyMutate,
    isPending,
    error: isVerifyError,
  } = useMutation({
    mutationKey: ['verify-token'],
    mutationFn: verifyApi,
  });

  const checkToken = async () => {
    const token = await AsyncStorage.getItem(TOKEN);
    const url = await AsyncStorage.getItem(BASE_URL);
    if (token && url) {
      assignBaseURlToAsyncStorage(url);
      assignBaseURlToAxios(url);
      assignTokenToAxios(token);
      dispatch(updateAuthSlice({ key: 'isLogin', value: true }));
      setIsMount(true);
      if (isConnected)
        verifyMutate(
          { token, url },
          {
            onSuccess() {
              // assignBaseURlToAsyncStorage(url);
              // assignBaseURlToAxios(url);
              // assignTokenToAxios(token);
              // dispatch(updateAuthSlice({ key: 'isLogin', value: true }));
            },

            onError(error) {
              // console.log('ERROR: ', error);
              // AsyncStorage.multiRemove([TOKEN, LOGIN_DATA]);
            },
          },
        );
    } else setIsMount(true);
  };

  useEffect(() => {
    checkToken();
  }, [isConnected]);

  return {
    isLoadingInitial: !isMount,
    isConnected,
    isVerifyError,
  };
}
