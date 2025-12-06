import { useEffect, useLayoutEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useAppDispatch, useEmployee } from 'src/redux/hooks';
import { fetchUserInfo } from 'src/redux/slices/auth/thunk';
import { fetchEmployee } from 'src/redux/slices/employee/thunk';

export default function useLanding() {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState({ label: 'Check In', value: 'check-in' });
  const { data, isLoading } = useEmployee();
  console.log('data: ##', data?.[0], isLoading);

  const onAttendance = () => {};

  const contextValue = {
    onAttendance,
    mode,
    setMode,
  };

  useEffect(() => {
    dispatch(fetchUserInfo());
    dispatch(fetchEmployee());
  }, []);

  useEffect(() => {
    if (data?.[0]) Alert.alert('DATA FETCGED');
  }, [data]);

  return {
    contextValue,
  };
}
