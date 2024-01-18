'use client';

import AppDate from './AppDate';
import AppFooter from './AppFooter';
import AppHeader from './AppHeader';
import AppNavbar from './AppNavbar';

export default function BlogPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className='app-container'>
        <AppHeader />
        <AppDate />
        <AppNavbar />
        <div className='px-4'>{children}</div>
      </main>
      <AppFooter />
    </>
  );
}
