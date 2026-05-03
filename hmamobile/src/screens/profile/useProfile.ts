import { useQuery } from '@tanstack/react-query';
import useUserId from 'src/hooks/useUserId';
import { useUserInfo } from 'src/redux/hooks';
import axiosInstance from 'src/services/axiosInstance';

const getProfile = async ({ id }: { id: number }) => {
  return await axiosInstance.get(`api/employee/${id}/profile`);
};

export default function useProfile() {
  const id = useUserId();
  const { data: profileData, isPending } = useQuery({
    queryKey: ['get/profile', id],
    queryFn: () => id && getProfile({ id }),
  });

  return {
    profileData,
    isPending,
  };
}
