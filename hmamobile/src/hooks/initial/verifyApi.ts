import axiosInstance from 'src/services/axiosInstance';
import { TOKEN } from 'src/utils/variables';

export default async function verifyApi({ token }: { token: string }) {
  const response = await axiosInstance.get('/verify', {
    headers: {
      [TOKEN]: token,
    },
  });
  return response;
}
