'use client';
import { Icon } from '@iconify/react';
import ThemeSwitcher from '@/components/util/ThemeSwitcher';
import OutlineButton from '@/components/util/OutlineButton';
import Link from 'next/link';

export default function AppHeader() {
  return (
    <header className={'flex h-[100px] items-center justify-between px-6'}>
      <p className={'text-[60px] font-bold'}>SENSE & SCIENCE</p>
      <div className={'flex items-center gap-4'}>
        <Link href={'/login'} className={'no-underline'}>
          <OutlineButton
            accent
            rightIcon={
              <Icon icon={'material-symbols-light:arrow-outward-rounded'}  className={'text-[1.5rem]'} />
            }
          >
            Become an author
          </OutlineButton>
        </Link>
        <ThemeSwitcher />
      </div>
    </header>
  );
}
