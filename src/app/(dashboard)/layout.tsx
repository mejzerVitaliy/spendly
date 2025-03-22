import { ReactNode } from 'react';

import { PrivateRoute } from '@/shared/ui';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <PrivateRoute>
      <main className="h-screen">
        <header className='w-full text-2xl h-[60px] flex items-center justify-center sticky top-0 bg-fuchsia-900'>
          Spendly
        </header>
        {children}
      </main>
    </PrivateRoute>
  );
}