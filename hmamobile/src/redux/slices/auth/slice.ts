import { createSlice } from '@reduxjs/toolkit';
import authThunk from './thunk';

export const initialState = {
  isLogin: false,
  userInfo: {
    isLoading: false,
    data: null,
  },
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
  },
  extraReducers: authThunk,
});

export default authSlice.reducer;
export const { updateAuthSlice } = authSlice.actions;
