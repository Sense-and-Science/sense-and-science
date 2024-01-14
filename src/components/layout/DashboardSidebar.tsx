'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useAuthStore } from '@/stores';
import { BlogUserRole } from '@/types';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function DashboardSidebar() {
  const { profile } = useAuthStore();

  const pathname = usePathname();

  return (
    <aside className='hidden w-[200px]  border-b-[0.5px] border-[rgba(255,255,255,0.2)] px-2 py-4 md:flex  lg:w-[250px] xl:w-[300px] '>
      <ul className='flex w-full flex-col gap-2 '>
        <Link
          href={'/dashboard'}
          className='flex items-center gap-4 rounded-lg bg-slate-500 px-4 py-2'
          style={{
            backgroundColor:
              pathname === '/dashboard'
                ? 'var(--text-primary)'
                : 'var(--bg-primary)',
            color:
              pathname === '/dashboard'
                ? 'var(--bg-primary)'
                : 'var(--text-primary)',
            transition: 'all 300ms ease-in-out',
          }}
        >
          <Icon icon={'pajamas:overview'} className='text-3xl' />
          <span>Overview</span>
        </Link>
        {profile && profile.role === BlogUserRole.ADMIN && (
          <>
            <Link
              href={'/dashboard/author-applications'}
              className='flex items-center gap-4 rounded-lg bg-slate-500 px-4 py-2'
              style={{
                backgroundColor:
                  pathname === '/dashboard/author-applications'
                    ? 'var(--text-primary)'
                    : 'var(--bg-primary)',
                color:
                  pathname === '/dashboard/author-applications'
                    ? 'var(--bg-primary)'
                    : 'var(--text-primary)',
                transition: 'all 300ms ease-in-out',
              }}
            >
              <Icon icon={'solar:documents-broken'} className='text-3xl' />
              <span>Applications</span>
            </Link>
          </>
        )}
        <Link
          href={'/dashboard/articles/new'}
          className='flex items-center gap-4 rounded-lg bg-slate-500 px-4 py-2'
          style={{
            backgroundColor:
              pathname === '/dashboard/articles/new'
                ? 'var(--text-primary)'
                : 'var(--bg-primary)',
            color:
              pathname === '/dashboard/articles/new'
                ? 'var(--bg-primary)'
                : 'var(--text-primary)',
            transition: 'all 300ms ease-in-out',
          }}
        >
          <Icon icon={'mdi:file-document-edit-outline'} className='text-3xl' />
          <span>Articles</span>
        </Link>
      </ul>
    </aside>
  );
}
