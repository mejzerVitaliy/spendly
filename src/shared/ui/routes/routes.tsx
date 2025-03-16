'use client';

import { ReactNode } from 'react';

import { useRouter } from 'next/navigation';

import { ROUTES } from '@/shared/consts';
// import { useStoreSelector } from 'shared/hooks';

interface RouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: RouteProps) => {
  const router = useRouter();

  // const { accessToken } = useStoreSelector(state => state.auth);

  if (false) {
    router.replace(ROUTES.LOGIN);

    return null;
  }

  router.replace(ROUTES.REGISTRATION);
};

const PublicRoute = ({ children }: RouteProps) => {
  // const router = useRouter();

  // const { accessToken, redirectTo } = useStoreSelector(state => state.auth);

  // if (accessToken) {
  //   router.replace(redirectTo || ROUTES.DASHBOARD);

  //   return null;
  // }

  return children;
};

export { PrivateRoute, PublicRoute };