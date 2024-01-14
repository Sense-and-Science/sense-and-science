import trendingArticle from "@/assets/images/trending-article.jpg"
import profilePicture from "@/assets/images/profile-picture.jpg"
import Image from "next/image"
import React from "react"

interface TrendingArticleProps {
    writerName: string,
    title: string,
    date: string,
    profilePicture: string,
    trendingArticle: string
}

export default function TrendingArticle({writerName, title, date}: TrendingArticleProps){
    return (
        <>
        <div>
            <Image src={trendingArticle} alt={'Trending Article'} width={trendingArticle.width} height={trendingArticle.height} className={'h-[180px] rounded-xl'}></Image>
            <div className={'my-2 flex h-full items-center gap-5'}>
                <Image src={profilePicture} alt={'Profile Picture'} width={profilePicture.width} height={profilePicture.height} className={'aspect-w-1 aspect-h-1 h-[2.5rem] w-[2.5rem] rounded-[50%]'}></Image>
                <p className={'font-semibold'}>{writerName}</p>
            </div>
            <p className={'text-lg font-bold'}>{title}</p>
            <p className={'text-xs'}>{date}</p>
        </div>
        </>
    )
}