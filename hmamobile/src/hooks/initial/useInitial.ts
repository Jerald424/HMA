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
import { createTables } from 'src/database/createTables';

export default function useInitial() {
  const [isReady, setIsReady] = useState(false);
  const dispatch = useAppDispatch();
  const { mutate: verifyMutate, isPending } = useMutation({
    mutationKey: ['verify-token'],
    mutationFn: verifyApi,
  });

  const checkToken = async () => {
    const token = await AsyncStorage.getItem(TOKEN);
    console.log('token: ', token);
    const url = await AsyncStorage.getItem(BASE_URL);
    if (token && url) {
      verifyMutate(
        { token, url },
        {
          onSuccess() {
            assignBaseURlToAsyncStorage(url);
            assignBaseURlToAxios(url);
            assignTokenToAxios(token);
            dispatch(updateAuthSlice({ key: 'isLogin', value: true }));
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

  useEffect(() => {
    createTables();
  }, []);

  return {
    isLoadingInitial: isPending || !isReady,
  };
}
