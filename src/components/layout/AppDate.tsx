"use client"

import {Icon} from "@iconify/react";
import {format} from "date-fns";
import {enUS} from "date-fns/locale";

const today = new Date();
const formattedDate = format(today, 'EEEE dd MMMM yyyy', {locale: enUS});
export default function AppDate() {
    return <p className='flex items-center gap-2 border-y-[0.15px] border-[var(--text-primary)] py-4 font-bold px-4 xl:px-6'>
        <Icon icon={'ph:dot-outline-fill'} className={'text-2xl'}/>
        {formattedDate.toUpperCase()}
        <Icon icon={'ph:dot-outline-fill'} className={'text-2xl'}/>
    </p>
}