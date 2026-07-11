import { useQuery } from '@tanstack/react-query';
import useUserId from 'src/hooks/useUserId';
import { useAppDispatch, useProfileInfo, useUserInfo } from 'src/redux/hooks';
import { fetchProfileThunk } from 'src/redux/slices/profile/thunk';
import axiosInstance from 'src/services/axiosInstance';

export default function useProfile() {
  const employee_id = useUserId();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useProfileInfo();

  const fetchProfile = () => dispatch(fetchProfileThunk({ employee_id }));

  return {
    profileData: data,
    isLoading,
    fetchProfile,
  };
}
