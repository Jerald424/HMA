import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDashboardApi, useInfoApi } from './api';
import { initialState } from './slice';

export const fetchUserInfo = createAsyncThunk('get/user-info', useInfoApi);
export const fetchDashboard = createAsyncThunk('get/dashboard', payload =>
  fetchDashboardApi({ id: payload?.id }),
);

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
    })

    .addCase(fetchDashboard.pending, state => {
      state.dashboard.isLoading = true;
    })
    .addCase(fetchDashboard.fulfilled, (state, { payload }) => {
      state.dashboard = {
        isLoading: false,
        data: payload as any,
      };
    })
    .addCase(fetchDashboard.rejected, state => {
      state.dashboard.isLoading = false;
    });
}
