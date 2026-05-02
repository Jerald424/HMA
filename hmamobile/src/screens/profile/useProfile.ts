import { useQuery } from '@tanstack/react-query';
import { useUserInfo } from 'src/redux/hooks';
import axiosInstance from 'src/services/axiosInstance';

const getProfile = async ({ id }: { id: number }) => {
  return await axiosInstance.get(`api/employee/${id}/profile`);
};

export default function useProfile() {
  const { data } = useUserInfo();
  const id = data?.result?.data?.basic_info?.id;
  const { data: profileData, isPending } = useQuery({
    queryKey: ['get/profile', data],
    queryFn: () => id && getProfile({ id }),
  });

  console.log('profileData: ', profileData);

  return {
    profileData,
    isPending,
  };
}
