import { serverFetch } from '@/lib/server-fetch';

export const forgotPassword = async (email: string) => {
  const res = await serverFetch('/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify({ email }),
  });

  return res;
};
