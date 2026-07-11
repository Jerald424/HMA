import { createSlice } from '@reduxjs/toolkit';
import profileThunk from './thunk';

export const initialState = {
  isLoading: false,
  data: undefined,
};

const profile = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: profileThunk,
});

export default profile.reducer;
