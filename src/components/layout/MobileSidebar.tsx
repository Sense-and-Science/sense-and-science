'use client';

import Link from 'next/link';
import React from 'react';

import OutlineButton from '@/components/util/OutlineButton';
import ThemeSwitcher from '@/components/util/ThemeSwitcher';
import { useAuthStore } from '@/stores';
import { BlogUserRole } from '@/types';
import { useDisclosure } from '@chakra-ui/hooks';
import {
    Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay,
    IconButton
} from '@chakra-ui/react';
import { Icon } from '@iconify/react';

const links = [
  {
    text: 'HOME',
    href: '/',
  },
  {
    text: 'ARTICLES',
    href: '/articles',
  },
  {
    text: 'AUTHORS',
    href: '/authors',
  },
] as const;

export function MobileSidebar() {
  const { profile } = useAuthStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <IconButton
        aria-label={'sidebar btn'}
        onClick={onOpen}
        className={'rounded-xl border-2 border-[var(--text-primary)] bg-[var(--bg-primary)] py-[0.9rem] text-[1.5rem] transition  hover:bg-[var(--text-primary-transparent)] md:hidden'}
        icon={<Icon icon={'cil:hamburger-menu'} />}
      ></IconButton>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent className={'bg-[var(--bg-primary)]'}>
          <DrawerCloseButton />

          <DrawerBody className={'flex items-center justify-center'}>
            <nav
              className={
                'flex flex-col px-4 py-6 text-[18px] font-[500] xl:px-6'
              }
            >
              <ul className={'flex flex-col items-center gap-10'}>
                {links.map((link) => {
                  return (
                    <li key={link.text}>
                      <Link href={link.href} className={'hover:underline'} onClick={onClose}>
                        {link.text}
                      </Link>
                    </li>
                  );
                })}
                <ThemeSwitcher />
              </ul>
            </nav>
          </DrawerBody>

          {profile &&
            profile.role !== BlogUserRole.AUTHOR &&
            profile.role !== BlogUserRole.ADMIN && (
              <DrawerFooter className={'flex items-center justify-center'}>
                <Link href={'/login'} className={'no-underline'} >
                  <OutlineButton
                    accent
                    rightIcon={
                      <Icon
                        icon={'material-symbols-light:arrow-outward-rounded'}
                        className={'text-[1.5rem]'}
                      />
                    }
                  >
                    Become an author
                  </OutlineButton>
                </Link>
              </DrawerFooter>
            )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
