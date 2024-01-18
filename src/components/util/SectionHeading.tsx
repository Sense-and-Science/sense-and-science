"use client"
import { PropsWithChildren } from 'react';

interface SectionHeadingProps extends PropsWithChildren {
}

export default function SectionHeading({children}: SectionHeadingProps) {
    return <h2
        className='my-6 flex items-center gap-2 border-y-[0.15px] border-[var(--text-primary)] p-4 text-center text-[1.5rem] font-[700] sm:text-left xl:px-6'>
        {children}
    </h2>
}