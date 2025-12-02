import { useEffect, useLayoutEffect, useState } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { fetchUserInfo } from 'src/redux/slices/auth/thunk';

export default function useLanding() {
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState({ label: 'Check In', value: 'check-in' });

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
