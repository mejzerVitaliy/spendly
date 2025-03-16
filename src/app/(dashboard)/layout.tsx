import { ReactNode } from 'react';

import { PrivateRoute } from '@/shared/ui';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <PrivateRoute>
      <main className="flex min-h-screen">
        {children}
      </main>
    </PrivateRoute>
  );
}