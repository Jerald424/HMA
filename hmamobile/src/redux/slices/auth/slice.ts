import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
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
});

export default authSlice.reducer;
export const { updateAuthSlice } = authSlice.actions;
