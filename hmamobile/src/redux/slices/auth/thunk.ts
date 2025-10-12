import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { useInfoApi } from './api';
import { initialState } from './slice';

export const fetchUserInfo = createAsyncThunk('get/user-info', useInfoApi);

export default function authThunk(
  builder: ActionReducerMapBuilder<typeof initialState>,
) {
  builder
    .addCase(fetchUserInfo.pending, state => {
      state.userInfo.isLoading = true;
    })
    .addCase(fetchUserInfo.fulfilled, (state, { payload }) => {
      state.userInfo = {
        isLoading: false,
        data: payload as any,
      };
    })
    .addCase(fetchUserInfo.rejected, state => {
      state.userInfo.isLoading = false;
    });
}
