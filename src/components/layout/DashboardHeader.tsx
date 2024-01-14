'use client';
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { MobileSidebar } from '@/components/layout/MobileSidebar';
import ThemeSwitcher from '@/components/util/ThemeSwitcher';
import { auth } from '@/firebase';
import { services } from '@/services';
import { useAuthStore } from '@/stores';
import { useMediaQuery } from '@chakra-ui/react';

import ProfileDropdown from '../util/ProfileDropdown';

export default function DashboardHeader() {
  const { profile, setUser, removeUser } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        removeUser();
        router.replace('/');
        return;
      }

      const { result, error } = await services.users.getUser(user.uid);
      if (!error && result) {
        setUser(user, result);
        if(pathname === "/login") {
            router.replace("/")
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, [pathname, removeUser, router, setUser]);

  const isInTabModeOrLess = useMediaQuery('(max-width: 768px)', { ssr: true });
  return (
    <header
      className={
        'flex h-[72px] items-center justify-between border-b-[0.5px] border-[rgba(255,255,255,0.2)] px-4 xl:px-6'
      }
    >
      <Link
        href={'/'}
        className={
          'text-[28px] font-bold sm:text-[24px] md:text-[28px] lg:text-[32px] xl:text-[36px]'
        }
      >
        SENSE & SCIENCE
      </Link>
      <div className={'flex items-center gap-4'}>
        {!isInTabModeOrLess[0] ? <ThemeSwitcher /> : null}
        {!isInTabModeOrLess[0] && profile ? (
          <div className='hidden items-center justify-center gap-4 md:flex'>
            <p>{profile?.firstName + ' ' + profile?.lastName}</p>
            <Image
              src={profile?.avatarUrl || 'https://i.pravatar.cc/150?img=57'}
              alt={`${profile?.firstName}'s profile picture`}
              width={50}
              height={50}
              className='aspect-square rounded-full'
            />
            <ProfileDropdown />
          </div>
        ) : null}

        <MobileSidebar />
      </div>
    </header>
  );
}
