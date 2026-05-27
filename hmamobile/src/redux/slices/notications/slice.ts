import { createSlice } from '@reduxjs/toolkit';
import notificationThunk from './thunk';

export const initialState = {
  isLoading: false,
  data: undefined,
};

const notification = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers: notificationThunk,
});

export default notification.reducer;
