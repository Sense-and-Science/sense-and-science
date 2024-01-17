"use client"
import Image from 'next/image';

import latestArticle from '@/assets/images/latest-article.jpg';
import profilePicture from '@/assets/images/profile-picture.jpg';

interface LatestArticleProps {
    // latestArticle: string,
    // profilePicture: string,
    writerName: string,
    title: string,
    caption: string,
    date: string
}

export default function LatestArticle({writerName, title, caption, date}: LatestArticleProps) {
    return (
        <>
            <div className={'flex items-center gap-6'}>
                <Image src={latestArticle} alt={'Latest Article'} width={latestArticle.width} height={latestArticle.height} className={'h-[130px] w-[130px] rounded-lg'}></Image>
                <div>
                    <div className={'my-1 flex items-center gap-5'}>
                        <Image src={profilePicture} alt={'Profile Picture'} width={profilePicture.width} height={profilePicture.height} className={'aspect-w-1 aspect-h-1 h-[2.5rem] w-[2.5rem] rounded-[50%]'}></Image>
                        <p className={'font-semibold'}>{writerName}</p>
                    </div>
                    <p className={'text-lg font-bold'}>{title}</p>
                    <p className={'text-md font-semibold'}>{caption}</p>
                    <p className={'text-xs'}>{date}</p>
                </div>
                
            </div>
            <hr className={'my-4'}/>
        </>
    )
}