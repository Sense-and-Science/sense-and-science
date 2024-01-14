'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { services } from '@/services';
import { Menu, MenuButton } from '@chakra-ui/menu';
import { IconButton, MenuItem, MenuList } from '@chakra-ui/react';
import { Icon } from '@iconify/react';

export default function ProfileDropdown() {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  function goToDashboard() {
    router.push('/dashboard');
  }

  async function logout() {
    setLoading(true);
    await services.users.logout();
    try {
      await fetch('http://localhost:3000/api/logout', {
        method: 'POST',
      });
    } catch (e) {
      console.log((e as Error).message);
    }
    setLoading(false);
  }

  return (
    <Menu size={'smaller'}>
      <MenuButton
        as={IconButton}
        aria-label={'Profile Dropdown'}
        icon={<Icon icon={'ion:md-arrow-dropdown'} />}
        className={
          'rounded-xl border-2 border-[var(--text-primary)] bg-[var(--bg-primary)] py-[0.9rem] text-[1.5rem]  transition hover:bg-[var(--text-primary-transparent)]'
        }
      />
      <MenuList
        className={'border-none bg-[var(--bg-primary)] shadow-xl'}
        minW={0}
        // w={'125px'}
      >
        <MenuItem
          onClick={goToDashboard}
          className={
            'bg-[var(--bg-primary)] transition hover:bg-[var(--text-primary-transparent)]'
          }
          icon={
            <Icon
              icon={'material-symbols:dashboard-outline'}
              className={'text-3xl'}
            />
          }
        >
          Dashboard
        </MenuItem>
        <MenuItem
          onClick={logout}
          className={
            'bg-[var(--bg-primary)] transition hover:bg-[var(--text-primary-transparent)]'
          }
          icon={
            <Icon
              icon={loading ? 'svg-spinners:90-ring' : 'ic:baseline-logout'}
              className={'text-3xl'}
            />
          }
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
