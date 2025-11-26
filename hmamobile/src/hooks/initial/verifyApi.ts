import axiosInstance from 'src/services/axiosInstance';
import { TOKEN } from 'src/utils/variables';

export default async function verifyApi({
  token,
  url,
}: {
  token: string;
  url: string;
}) {
  const response = await axiosInstance.get(`${url}/verify`, {
    headers: {
      [TOKEN]: token,
    },
  });
  return response;
}
