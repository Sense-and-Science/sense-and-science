'use client';
import { onAuthStateChanged } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

import darkLogo from '@/assets/images/logo-b.svg';
import lightLogo from '@/assets/images/logo-w.svg';
import { MobileSidebar } from '@/components/layout/MobileSidebar';
import ThemeSwitcher from '@/components/util/ThemeSwitcher';
import { auth } from '@/firebase';
import { services } from '@/services';
import { useAuthStore } from '@/stores';
import { useColorModeStore } from '@/stores/color-mode.store';
import { useMediaQuery } from '@chakra-ui/react';

import ProfileDropdown from '../util/ProfileDropdown';

export default function DashboardHeader() {
  const { profile, setUser, removeUser } = useAuthStore();
  const { colorMode } = useColorModeStore();
  const router = useRouter();
  const pathname = usePathname();

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
        if (pathname === '/login') {
          router.replace('/');
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
        'flex h-[72px] items-center justify-between border-b-[0.5px] border-[var(--text-primary-transparent)] px-4 xl:px-6'
      }
    >
      <Link
        href={'/'}
        className={
          'flex items-center gap-4 text-[24px] font-bold sm:text-[32px] md:text-[36px]'
        }
      >
        <Image
          src={colorMode === 'dark' ? lightLogo : darkLogo}
          height={50}
          width={50}
          alt='Logo'
          className='h-[36px] w-[36px] md:h-[44px] md:w-[44px]'
        ></Image>
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
              className='aspect-square rounded-full object-cover'
            />
            <ProfileDropdown />
          </div>
        ) : null}

        <MobileSidebar />
      </div>
    </header>
  );
}
