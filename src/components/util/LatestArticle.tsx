"use client"
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import Image from 'next/image';

import { BlogArticleCompund } from '@/types';

interface LatestArticleProps {
    article: BlogArticleCompund
}

export default function LatestArticle({article}: LatestArticleProps) {
    const {createdAt, title, authorName, authorAvatar, description, coverImage} = article
    return (
        <>
            <div className={'flex items-center gap-6'}>
                <Image src={coverImage || ""} alt={'Latest Article'} width={130} height={130} className={'h-[130px] w-[130px] rounded-lg'}></Image>
                <div>
                    <div className={'my-1 flex items-center gap-5'}>
                        <Image src={authorAvatar || ""} alt={'Profile Picture'} width={60} height={60} className={'aspect-w-1 aspect-h-1 h-[2.5rem] w-[2.5rem] rounded-[50%]'}></Image>
                        <p className={'font-semibold'}>{authorName}</p>
                    </div>
                    <p className={'text-lg font-bold'}>{title}</p>
                    <p className={'text-md font-semibold'}>{
                        description.slice(0, 63) + "..."
                    }</p>
                    <p className={'text-xs'}>{
                        format(createdAt.toDate(), 'MMM dd, yyyy', { locale: enUS })
                    }</p>
                </div>
                
            </div>
            <hr className={'my-4'}/>
        </>
    )
}