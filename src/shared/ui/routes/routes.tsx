'use client';

import { ReactNode, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { ROUTES } from '@/shared/consts';
import { useAuthStore } from '@/shared/stores';

interface RouteProps {
  children: ReactNode;
}

// CHANGE THIS LOGIC LATER TO NEXT.JS MIDDLEWARE

const PrivateRoute = ({ children }: RouteProps) => {
  const router = useRouter();
  const { accessToken } = useAuthStore();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (accessToken) {
      setIsLoaded(true);
    } else {
      router.replace(ROUTES.LOGIN);
    }
  }, [accessToken, router]);

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