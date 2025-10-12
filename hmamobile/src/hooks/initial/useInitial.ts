import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import { useLayoutEffect, useState } from 'react';
import { assignTokenToAxios } from 'src/screens/login/useLogin';
import { LOGIN_DATA, TOKEN } from 'src/utils/variables';
import verifyApi from './verifyApi';
import { useAppDispatch } from 'src/redux/hooks';
import { updateAuthSlice } from 'src/redux/slices/auth/slice';

export default function useInitial() {
  const [isReady, setIsReady] = useState(false);
  const dispatch = useAppDispatch();
  const { mutate: verifyMutate, isPending } = useMutation({
    mutationKey: ['verify-token'],
    mutationFn: verifyApi,
  });

  const checkToken = async () => {
    const token = await AsyncStorage.getItem(TOKEN);
    if (token) {
      verifyMutate(
        { token },
        {
          onSuccess() {
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

  return {
    isLoadingInitial: isPending || !isReady,
  };
}
