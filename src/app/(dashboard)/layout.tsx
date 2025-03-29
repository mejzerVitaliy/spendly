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
      <main className="h-screen max-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1">{children}</div>
        </div>
      </main>
    </PrivateRoute>
  );
}