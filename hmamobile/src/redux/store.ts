import { configureStore } from '@reduxjs/toolkit';
import auth from './slices/auth/slice';
import notification from './slices/notications/slice';
import profile from './slices/profile/slice';

const store = configureStore({
  reducer: {
    auth,
    notification,
    profile,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
