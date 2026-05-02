import axiosInstance from 'src/services/axiosInstance';

export default async function loginApi({
  data,
  baseURL,
}: {
  data: { login: string; password: string };
  baseURL: string;
}) {
  return await axiosInstance.post(`${baseURL}/api/employee/login`, {
    params: data,
  });
}
