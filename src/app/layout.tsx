import { ReactNode } from 'react';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; 

import './styles/global.css';
import { QueryProvider } from '@/shared/providers';


const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Spendly',
  description: 'Spendly is a personal finance app that helps you track your expenses and manage your budget effectively.',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}