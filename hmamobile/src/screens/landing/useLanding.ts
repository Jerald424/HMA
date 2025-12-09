import { useEffect, useState } from 'react';
import useEmployeeData from 'src/hooks/useEmployee';
import { useAppDispatch } from 'src/redux/hooks';
import { fetchUserInfo } from 'src/redux/slices/auth/thunk';

export default function useLanding() {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState({ label: 'Check In', value: 'check-in' });
  useEmployeeData();

  const onAttendance = () => {};

  const contextValue = {
    onAttendance,
    mode,
    setMode,
  };

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  return {
    contextValue,
  };
}
