import axiosInstance from 'src/services/axiosInstance';
import { TOKEN } from 'src/utils/variables';

export default async function verifyApi({
  token,
  url,
}: {
  token: string;
  url: string;
}) {
  const response = await axiosInstance.post(
    `${url}/api/employee/verify-token`,
    {
      params: {},
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response;
}
