import type { Metadata } from 'next';
import '@/assets/scss/globals.scss';

import { Inter } from 'next/font/google';
import React from 'react';

import Providers from '@/app/providers';
import AppDate from '@/components/layout/AppDate';
import AppFooter from '@/components/layout/AppFooter';
import AppHeader from '@/components/layout/AppHeader';
import AppNavbar from '@/components/layout/AppNavbar';

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
          <AppHeader />
          <AppDate />
          <AppNavbar />
          <div className='px-4'>{children}</div>
          <AppFooter />
        </Providers>
      </body>
    </html>
  );
}
