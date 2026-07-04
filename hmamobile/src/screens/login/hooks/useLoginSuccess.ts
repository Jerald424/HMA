import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOGIN_DATA } from 'src/utils/variables';
import { assignTokenToAsyncStorage, assignTokenToAxios } from '../useLogin';
import { useAppDispatch } from 'src/redux/hooks';
import { updateAuthSlice } from 'src/redux/slices/auth/slice';

export default function useLoginSuccess() {
  const dispatch = useAppDispatch();

  const onSuccess = (response: any) => {
    AsyncStorage.setItem(LOGIN_DATA, JSON.stringify(response));
    assignTokenToAsyncStorage(response?.result?.token);
    assignTokenToAxios(response?.result?.token);
    dispatch(updateAuthSlice({ key: 'isLogin', value: true }));
  };
  return {
    onSuccess,
  };
}
