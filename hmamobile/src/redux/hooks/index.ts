import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAuth = () => useAppSelector(s => s.auth);
export const useNotifications = () => useAppSelector(s => s.notification);
export const useUserInfo = () => useAppSelector(s => s.auth.userInfo);
