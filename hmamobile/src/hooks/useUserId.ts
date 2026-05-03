import { useUserInfo } from 'src/redux/hooks';

export default function useUserId() {
  const { data } = useUserInfo();
  const id = data?.result?.data?.basic_info?.id;
  return id;
}
