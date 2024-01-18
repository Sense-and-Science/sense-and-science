"use client";
import '@/assets/scss/globals.scss';

import { Inter } from 'next/font/google';
import Head from 'next/head';
import React from 'react';

import Providers from '@/app/providers';
import DashboardHeader from '@/components/layout/DashboardHeader';
import DashboardSidebar from '@/components/layout/DashboardSidebar';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <Head>
        <title>Sense & Science</title>
        <meta
          name='description'
          content='Welcome to the University of Colombo Tech and Science Blog.'
        ></meta>
      </Head>
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
