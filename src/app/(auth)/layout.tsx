import { ReactNode } from 'react';

import { PublicRoute } from '@/shared/ui';
import Image from 'next/image';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <PublicRoute>
      <div className="flex min-h-screen max-h-screen p-3">
        <div className="relative w-3/5">
          <Image className='rounded-2xl border border-gray-700 object-cover' fill src={'/auth-photo.svg'} alt='auth' />
        </div>

        <div className="flex w-1/2 items-center justify-center px-20 py-4">
          {children}
        </div>
      </div>
    </PublicRoute>
  );
}