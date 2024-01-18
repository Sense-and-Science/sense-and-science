'use client';
import '@/assets/scss/globals.scss';

import { Inter } from 'next/font/google';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import Providers from '@/app/providers';
import AppDate from '@/components/layout/AppDate';
import AppFooter from '@/components/layout/AppFooter';
import AppHeader from '@/components/layout/AppHeader';
import AppNavbar from '@/components/layout/AppNavbar';
import { services } from '@/services';
import { useArticlesStore } from '@/stores';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { publishedArticles, setLoadingPublishedArticles, setArticles } =
    useArticlesStore();

  async function loadArticles() {
    setLoadingPublishedArticles(true);
    const { result, error } = await services.articles.getPublishedArticles();
    if (error) {
      toast((error as Error).message, { type: 'error' });
    } else if (result) {
      console.log(result);
      setArticles(result);
    }
    setLoadingPublishedArticles(false);
  }

  useEffect(() => {
    if (!publishedArticles) {
      loadArticles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <html lang='en'>
      <head>
        <title>Sense & Science</title>
        <meta
          name='description'
          content='Welcome to the University of Colombo Tech and Science Blog.'
        />
      </head>
      <body className={`${inter.className}`}>
        
        <Providers>
          <main className='app-container'>
            <AppHeader />
            <AppDate />
            <AppNavbar />
            <div className='px-4'>{children}</div>
          </main>
          <AppFooter />
        </Providers>
      </body>
    </html>
  );
}
