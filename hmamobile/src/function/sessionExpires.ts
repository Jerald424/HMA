import { updateAuthSlice } from 'src/redux/slices/auth/slice';
import store from 'src/redux/store';
import {
  removeTokenFromAsyncStorage,
  removeTokenFromAxios,
} from 'src/screens/login/useLogin';

export default function sessionExpires() {
  removeTokenFromAxios();
  removeTokenFromAsyncStorage();
  store.dispatch(updateAuthSlice({ key: 'isLogin', value: false }));
  store.dispatch(updateAuthSlice({ key: 'isSessionExpire', value: true }));
}
