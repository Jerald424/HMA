import { createSlice } from '@reduxjs/toolkit';
import authThunk from './thunk';

export const initialState = {
  isLogin: false,
  userInfo: {
    isLoading: false,
    data: null,
  },
  dashboard: {
    isLoading: false,
    data: null,
  },
  dummy_office: {},
  isSessionExpire: false,
  token: '',
  baseurl: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuthSlice(
      state,
      { payload }: { payload: { key: keyof typeof initialState; value: any } },
    ) {
      state[payload.key] = payload.value;
    },
    updateOffice(state, { payload }) {
      state['userInfo']['data']['offices'].push(payload);
    },
  },
  extraReducers: authThunk,
});

export default authSlice.reducer;
export const { updateAuthSlice, updateOffice } = authSlice.actions;
