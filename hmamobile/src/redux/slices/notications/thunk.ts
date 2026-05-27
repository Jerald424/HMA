import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { initialState } from './slice';
import { fetchNotificationApi } from './api';

export const fetchNotificationThunk = createAsyncThunk(
  'get/notification',
  async payload =>
    await fetchNotificationApi({ employee_id: payload?.employee_id }),
);

export default function notificationThunk(
  builder: ActionReducerMapBuilder<typeof initialState>,
) {
  builder
    .addCase(fetchNotificationThunk.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchNotificationThunk.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    })
    .addCase(fetchNotificationThunk.rejected, state => {
      state.isLoading = false;
    });
}
