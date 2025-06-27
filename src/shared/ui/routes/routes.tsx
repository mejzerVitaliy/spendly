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
  const { validateAndUpdateTokens, isAuthenticated } = useAuthStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const isValid = validateAndUpdateTokens();
      if (isValid) {
        setIsLoaded(true);
      } else {
        console.log('Authentication failed, redirecting to login');
        router.replace(ROUTES.LOGIN);
      }
    };

    checkAuth();
  }, [router, validateAndUpdateTokens]);

  useEffect(() => {
    if (isLoaded && !isAuthenticated) {
      console.log('User logged out, redirecting to login');
      router.replace(ROUTES.LOGIN);
    }
  }, [isAuthenticated, isLoaded, router]);

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
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, router]);

  return children;
};

export { PrivateRoute, PublicRoute };