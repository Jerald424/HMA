import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { initialState } from './slice';
import { getProfile } from './api';

export const fetchProfileThunk = createAsyncThunk(
  'get/Profile',
  async payload => await getProfile({ employee_id: payload?.employee_id }),
);

export default function ProfileThunk(
  builder: ActionReducerMapBuilder<typeof initialState>,
) {
  builder
    .addCase(fetchProfileThunk.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchProfileThunk.fulfilled, (state, { payload }) => {
      state.data = payload;
      state.isLoading = false;
    })
    .addCase(fetchProfileThunk.rejected, state => {
      state.isLoading = false;
    });
}
