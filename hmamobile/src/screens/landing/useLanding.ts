import { useEffect, useLayoutEffect, useState } from 'react';
import useEmployee from 'src/hooks/useEmployee';
import { useAppDispatch } from 'src/redux/hooks';
import { fetchUserInfo } from 'src/redux/slices/auth/thunk';

export default function useLanding() {
  const dispatch = useAppDispatch();
  useEmployee();

  useEffect(() => {
    dispatch(fetchUserInfo());
  }, []);

  return {};
}
