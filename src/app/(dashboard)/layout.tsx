import { ReactNode } from 'react';

import { PrivateRoute } from '@/shared/ui';
import { Header } from '@/widgets/header';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <PrivateRoute>
      <main className="h-screen bg-background">
        <Header />
        {children}
      </main>
    </PrivateRoute>
  );
}