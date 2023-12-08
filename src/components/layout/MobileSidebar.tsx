import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton, Button, Input, IconButton,
} from '@chakra-ui/react'
import {useDisclosure} from "@chakra-ui/hooks";
import React from "react";
import {Icon} from "@iconify/react";
import Link from "next/link";
import ThemeSwitcher from "@/components/util/ThemeSwitcher";
import OutlineButton from "@/components/util/OutlineButton";

const links = [
    {
        text: "HOME",
        href: "/"
    },
    {
        text: "NEWS",
        href: "/news"
    }, {
        text: "ARTICLES",
        href: "/articles"
    },
    {
        text: "AUTHORS",
        href: "/authors"
    }
] as const

export function MobileSidebar() {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const btnRef = React.useRef<HTMLButtonElement | null>(null)

    return (
        <>
            <IconButton aria-label={'sidebar btn'} ref={btnRef} onClick={onOpen} className={'md:hidden'}
                        icon={<Icon icon={'cil:hamburger-menu'} className={'text-[1.5rem]'}/>}>
            </IconButton>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay/>
                <DrawerContent className={'bg-[var(--bg-primary)]'}>
                    <DrawerCloseButton/>

                    <DrawerBody className={'flex items-center justify-center'}>
                        <nav className={'flex flex-col px-4 py-6 text-[18px] font-[500] xl:px-6'}>
                            <ul className={'flex flex-col items-center gap-10'}>
                                {
                                    links.map(link => {
                                        return <li key={link.text}>
                                            <Link href={link.href} className={'hover:underline'}>
                                                {link.text}
                                            </Link>
                                        </li>
                                    })
                                }
                                <ThemeSwitcher/>
                            </ul>
                        </nav>
                    </DrawerBody>

                    <DrawerFooter className={'flex items-center justify-center'}>
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
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}







