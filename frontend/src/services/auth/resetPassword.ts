import { serverFetch } from '@/lib/server-fetch';

export const resetPassword = async (payload: any) => {
  const res = await serverFetch('/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return res;
};
