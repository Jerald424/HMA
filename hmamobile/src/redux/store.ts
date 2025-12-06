import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auth from './slices/auth/slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import employee from './slices/employee/slice';

const rootReducer = combineReducers({
  auth,
  employee,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['employee'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
