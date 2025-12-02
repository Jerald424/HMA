import { useEffect, useLayoutEffect, useState } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { fetchUserInfo } from 'src/redux/slices/auth/thunk';

export default function useLanding() {
  const dispatch = useAppDispatch();

  const onAttendance = () => {};

  const contextValue = {
    onAttendance,
  };

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  return {
    contextValue,
  };
}
