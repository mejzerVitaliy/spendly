'use client';

import { ReactNode, useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { ROUTES } from '@/shared/consts';
import { useAuthStore } from '@/shared/stores';

interface RouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: RouteProps) => {
  const router = useRouter();
  const { accessToken } = useAuthStore()

  useEffect(() => {
    if (!accessToken) {
      router.replace(ROUTES.LOGIN);
    }
  }, [accessToken, router]);

  return children;
};

const PublicRoute = ({ children }: RouteProps) => {
  const router = useRouter();
  const { accessToken } = useAuthStore();

  useEffect(() => {
    if (accessToken) {
      router.replace(ROUTES.DASHBOARD);
    }
  }, [accessToken, router]);

  return children;
};

export { PrivateRoute, PublicRoute };