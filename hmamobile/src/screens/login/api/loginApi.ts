import axiosInstance from 'src/services/axiosInstance';

export default async function loginApi({
  data,
}: {
  data: { login: string; password: string };
}) {
  return await axiosInstance.post('/login', data);
}
