import { ReactNode } from 'react';

import { PublicRoute } from '@/shared/ui';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <PublicRoute>
      <div className="flex min-h-screen max-h-screen p-3">
        <div className="relative w-2/3 overflow-hidden rounded-2xl bg-[linear-gradient(180deg,#000_0%,#aa5be2_100%)] p-4 border border-gray-700">
          <div className="relative z-10 mt-24 flex flex-col justify-center gap-4 pl-[90px] pr-4">
            <h1 className="text-2xl">Your Financial Future Is Here - Spendly</h1>
          </div>
        </div>

        <div className="flex w-1/2 items-center justify-center px-20 py-4">
          {children}
        </div>
      </div>
    </PublicRoute>
  );
}