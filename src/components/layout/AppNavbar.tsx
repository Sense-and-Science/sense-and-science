'use client';

import Link from 'next/link';

import { useMediaQuery } from '@chakra-ui/react';

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

export default function AppNavbar() {
  const isInTabModeOrLess = useMediaQuery('(max-width: 768px)', { ssr: true });

  return (
    !isInTabModeOrLess[0] && (
      <nav className={'flex px-4 py-6 text-[18px] font-[500] xl:px-6'}>
        <ul className={'ml-4 flex items-center gap-10'}>
          {links.map((link) => {
            return (
              <li key={link.text}>
                <Link href={link.href} className={'hover:underline'}>
                  {link.text}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    )
  );
}
