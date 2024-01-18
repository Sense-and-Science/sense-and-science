'use client';

import DashboardHeader from './DashboardHeader';
import DashboardSidebar from './DashboardSidebar';

export default function DashboardPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardHeader />
      <main className='flex h-[calc(100vh-72px)] justify-between'>
        <DashboardSidebar />
        <div className='w-full px-4'>{children}</div>
      </main>
    </>
  );
}
