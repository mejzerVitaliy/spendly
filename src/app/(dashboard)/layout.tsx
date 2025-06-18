import { ReactNode } from 'react';

import { PrivateRoute } from '@/shared/ui';
import { Header } from '@/widgets/header';
import { Sidebar } from '@/widgets/sidebar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <PrivateRoute>
      <main className="h-screen max-h-screen overflow-hidden bg-background flex">
        <Sidebar />

        <div className="flex-1">
          <Header />
          <div className="flex-1">
            {children}
          </div>
        </div>
      </main>
    </PrivateRoute>
  );
}