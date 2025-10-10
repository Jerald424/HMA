import axiosInstance from 'src/services/axiosInstance';

export default async function loginApi({
  data,
}: {
  data: { login: string; password: string };
}) {
  return await axiosInstance.get('/login', {
    headers: data,
  });
}
