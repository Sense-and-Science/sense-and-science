'use client';
import { useEffect, useState } from 'react';

import { Menu, MenuButton } from '@chakra-ui/menu';
import { IconButton, MenuItem, MenuList } from '@chakra-ui/react';
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

    function setColorModeTo(mode: "light" | "dark") {
        setTimeout(() => {
            setColorMode(mode)
        }, 100)
    }

    return (
        <Menu size={'smaller'}>
            <MenuButton
                as={IconButton}
                aria-label={'Theme Switcher'}
                icon={<Icon icon={'carbon:color-palette'}/>}
                className={
                    'rounded-xl border-2 border-[var(--text-primary)] bg-[var(--bg-primary)] py-[0.9rem] text-[1.5rem]  transition hover:bg-[var(--text-primary-transparent)] active:bg-[var(--text-primary-transparent)]'
                }
            />
            <MenuList className={'border-none bg-[var(--bg-primary)] shadow-xl'} minW={0} w={'125px'}>
                <MenuItem
                    onClick={() => {
                        setColorModeTo('light');
                    }}
                    className={
                        'bg-[var(--bg-primary)] transition hover:bg-[var(--text-primary-transparent)]'
                    }
                    icon={<Icon icon={'material-symbols:wb-sunny-outline'} className={'text-3xl'}/>}
                >
                    Light
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        setColorModeTo('dark');
                    }}
                    className={
                        'bg-[var(--bg-primary)] transition hover:bg-[var(--text-primary-transparent)]'
                    }
                    icon={<Icon icon={'ic:outline-dark-mode'} className={'text-3xl'}/>}
                >
                    Dark
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
