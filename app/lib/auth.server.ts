import { createAuthClient } from 'better-auth/react';

import { ENV } from './env';

export type Session = {
  id: string;
  email: string;
  name: string;
  hasVoted?: boolean;
}

export const getAuthServer = () => {
  const auth_server = createAuthClient({
    baseURL: ENV.BACKEND_URL,
  });

  return auth_server;
};

export const getUserFromRequest = async (request: Request) => {
  const authClient = getAuthServer();
  const cookie = request.headers.get('Cookie') || '';

  const session = await authClient.getSession({
    fetchOptions: {
      headers: {
        Cookie: cookie,
      },
    },
  });

  return session?.data?.user as Session | null;
};