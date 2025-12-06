import { createSlice } from '@reduxjs/toolkit';
import employeeThunk from './thunk';

export const initialState = {
  isLoading: false,
  data: null,
};

const employeeSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: employeeThunk,
});

export default employeeSlice.reducer;
