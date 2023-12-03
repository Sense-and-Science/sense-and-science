"use client";
import Link from "next/link";
import ThemeSwitcher from "@/components/util/ThemeSwitcher";

export default function AppHeader() {
    return <header className={'flex h-[100px] items-center justify-between'}>
        <p className={'text-[60px] font-bold'}>
            SENSE & SCIENCE
        </p>
        <div>
            <Link href={'/login'}>
                <button>
                    Become an author
                </button>
            </Link>
            <ThemeSwitcher/>

        </div>
    </header>
}