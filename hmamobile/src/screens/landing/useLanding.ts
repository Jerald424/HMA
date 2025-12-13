import { useEffect, useLayoutEffect, useState } from 'react';
import FaceNet from 'src/native/FaceNet';
import { useAppDispatch, useAuth } from 'src/redux/hooks';
import { fetchUserInfo } from 'src/redux/slices/auth/thunk';
import { IS_ANDROID } from 'src/utils/variables';

export default function useLanding() {
  const dispatch = useAppDispatch();
  const { baseurl } = useAuth();

  useEffect(() => {
    dispatch(fetchUserInfo()).then(data => {
      try {
        if (IS_ANDROID) {
          const user = data?.payload;
          FaceNet.initializeEmployees([
            {
              id: user?.Employee_ID,
              name: user?.Employee_Name,
              imageUrl: `${baseurl}${user?.Employee_Image_URL}`,
            },
          ]);
        }
      } catch (error) {
        console.log('ERROR: ', error);
      }
    });
  }, []);

  return {};
}
