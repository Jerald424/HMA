import { useMutation } from '@tanstack/react-query';
import logoutApi from './api/logoutApi';
import { useRef, useState } from 'react';
import { alertRefProp } from 'src/components/styled/template/modal/alert';
import {
  removeTokenFromAsyncStorage,
  removeTokenFromAxios,
} from 'src/screens/login/useLogin';
import { useAppDispatch } from 'src/redux/hooks';
import { updateAuthSlice } from 'src/redux/slices/auth/slice';

export default function useLogin() {
  const [isShowLogout, setIsShowLogout] = useState(false);
  const dispatch = useAppDispatch();

  const { mutate: logoutMutate, isPending: isLoadingLogout } = useMutation({
    mutationKey: ['logout'],
    mutationFn: logoutApi,
  });

  const onLogout = () => {
    setIsShowLogout(false);
    logoutMutate(undefined, {
      onSettled() {
        removeTokenFromAsyncStorage();
        removeTokenFromAxios();
        dispatch(updateAuthSlice({ key: 'isLogin', value: false }));
      },
    });
  };

  return {
    isShowLogout,
    setIsShowLogout,
    onLogout,
    isLoadingLogout,
  };
}
