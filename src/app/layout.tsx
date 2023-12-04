import type {Metadata} from 'next';
import {Inter} from 'next/font/google';
import '../assets/scss/globals.scss';
import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import Providers from '@/app/providers';
import AppNavbar from "@/components/layout/AppNavbar";
import AppDate from "@/components/layout/AppDate";

const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Sense & Science',
    description: 'Welcome to the University of Colombo Tech and Science Blog.',
};

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
        <body className={`${inter.className} app-container`}>
        <Providers>
            <AppHeader/>
            <AppDate/>
            <AppNavbar/>
            {children}
        </Providers>
        </body>
        </html>
    );
}
