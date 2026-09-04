import { serverFetch } from '@/lib/server-fetch';

export const resetPassword = async (payload: { token: string; newPassword: string }) => {
  const response = await serverFetch.post('/auth/reset-password', {
    body: JSON.stringify(payload),
  });

  return response.json();
};
