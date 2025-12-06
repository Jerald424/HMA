import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { employeesListApi } from './api';
import { initialState } from './slice';

export const fetchEmployee = createAsyncThunk(
  'get/employees',
  employeesListApi,
);

export default function employeeThunk(
  builder: ActionReducerMapBuilder<typeof initialState>,
) {
  builder

    .addCase(fetchEmployee.pending, state => {
      state.isLoading = true;
    })
    .addCase(fetchEmployee.fulfilled, (state, { payload }) => {
      state = {
        isLoading: false,
        data: payload as any,
      };
    })
    .addCase(fetchEmployee.rejected, state => {
      state.isLoading = false;
    });
}
