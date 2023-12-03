'use client';
import { useEffect, useState } from 'react';
import { IconButton, MenuItem, MenuList } from '@chakra-ui/react';
import { Menu, MenuButton } from '@chakra-ui/menu';
import { Icon } from '@iconify/react';

export default function ThemeSwitcher() {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const htmlElement = document.querySelector('html') as HTMLHtmlElement;
    if (colorMode === 'light') {
      htmlElement.classList.remove('dark');
    } else if (colorMode === 'dark') {
      htmlElement.classList.add('dark');
    }
  }, [colorMode]);

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label={'Theme Switcher'}
        icon={<Icon icon={'carbon:color-palette'} />}
        className={
          'rounded-xl border-2 border-[var(--text-primary)] bg-[var(--bg-primary)] py-[0.9rem] text-[1.5rem]  transition hover:bg-[var(--text-primary-transparent)]'
        }
      />
      <MenuList>
        <MenuItem
          onClick={() => {
            setColorMode('dark');
          }}
        >
          Dark
        </MenuItem>
        <MenuItem
          onClick={() => {
            setColorMode('light');
          }}
        >
          Light
        </MenuItem>
      </MenuList>
    </Menu>
  );
}
