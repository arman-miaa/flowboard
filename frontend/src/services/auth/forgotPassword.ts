import { serverFetch } from '@/lib/server-fetch';

export const forgotPassword = async (email: string) => {
  const response = await serverFetch.post('/auth/forgot-password', {
    body: JSON.stringify({ email }),
  });

  return response.json();
};
