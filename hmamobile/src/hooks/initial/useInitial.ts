import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { updateAuthSlice } from 'src/redux/slices/auth/slice';
import {
  assignBaseURlToAsyncStorage,
  assignBaseURlToAxios,
  assignTokenToAxios,
} from 'src/screens/login/useLogin';
import { BASE_URL, TOKEN } from 'src/utils/variables';
import verifyApi from './verifyApi';

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

  const verifyToken = ({
    token,
    url,
    onSuccess,
  }: {
    token: string;
    url: string;
    onSuccess: (data: any) => void;
  }) => {
    verifyMutate({ token, url }, { onSuccess });
  };

  const checkToken = async () => {
    const token = await AsyncStorage.getItem(TOKEN);
    const url = await AsyncStorage.getItem(BASE_URL);
    if (token && url) {
      assignBaseURlToAsyncStorage(url);
      assignBaseURlToAxios(url);
      assignTokenToAxios(token);
      dispatch(updateAuthSlice({ key: 'isLogin', value: true }));
      dispatch(updateAuthSlice({ key: 'token', value: token }));
      dispatch(updateAuthSlice({ key: 'baseurl', value: url }));
      setIsMount(true);
      if (isConnected) verifyToken({ token, url });
    } else setIsMount(true);
  };

  useEffect(() => {
    checkToken();
  }, [isConnected]);

  return {
    isLoadingInitial: !isMount,
    isConnected,
    isVerifyError,
    verifyToken,
  };
}
