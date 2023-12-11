'use client';
import {Icon} from '@iconify/react';
import ThemeSwitcher from '@/components/util/ThemeSwitcher';
import OutlineButton from '@/components/util/OutlineButton';
import Link from 'next/link';
import {useMediaQuery} from "@chakra-ui/react";
import {MobileSidebar} from "@/components/layout/MobileSidebar";

export default function AppHeader() {
    const isInTabModeOrLess = useMediaQuery("(max-width: 768px)", {ssr: true})
    return (
        <header
            className={'flex h-[72px] items-center justify-between px-4 sm:h-[76px] md:h-[72px] lg:h-[84px] xl:h-[100px] xl:px-6'}>
            <p className={'text-[28px] font-bold sm:text-[32px] md:text-[36px] lg:text-[48px] xl:text-[60px]'}>SENSE &
                SCIENCE</p>
            <div className={'flex items-center gap-4'}>
                {
                    !isInTabModeOrLess[0] ? <>
                            <Link href={'/login'} className={'no-underline'}>
                                <OutlineButton
                                    accent
                                    rightIcon={
                                        <Icon icon={'material-symbols-light:arrow-outward-rounded'}
                                              className={'text-[1.5rem]'}/>
                                    }
                                >
                                    Become an author
                                </OutlineButton>
                            </Link>
                            <ThemeSwitcher/>
                        </>
                        : null
                }

                <MobileSidebar/>
            </div>
        </header>
    );
}
