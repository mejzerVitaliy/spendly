'use client';

import { ReactNode, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { ROUTES } from '@/shared/consts';
import { useAuthStore } from '@/shared/stores';

interface RouteProps {
  children: ReactNode;
}

const PrivateRoute = ({ children }: RouteProps) => {
  const router = useRouter();
  const { validateAndUpdateTokens } = useAuthStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const isValid = validateAndUpdateTokens();
    if (isValid) {
      setIsLoaded(true);
    } else {
      router.replace(ROUTES.LOGIN);
    }
  }, [router, validateAndUpdateTokens]);

  if (!isLoaded) {
    return (
      <div className='w-full h-screen flex justify-center items-center bg-background'>
        <span className='w-20 h-20 border-4 border-dashed rounded-full animate-spin'/>
      </div>
    );
  }

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