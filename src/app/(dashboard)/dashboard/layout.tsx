import type { Metadata } from 'next';
import '@/assets/scss/globals.scss';

import { Inter } from 'next/font/google';
import React from 'react';

import Providers from '@/app/providers';
import DashboardHeader from '@/components/layout/DashboardHeader';
import DashboardSidebar from '@/components/layout/DashboardSidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sense & Science',
  description: 'Welcome to the University of Colombo Tech and Science Blog.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${inter.className} app-container`}>
        <Providers>
          <DashboardHeader />
          <main className='flex h-[calc(100vh-72px)] justify-between'>
            <DashboardSidebar />
            <div className='w-full px-4'>{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
