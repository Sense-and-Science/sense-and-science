import trendingArticle from "@/assets/images/trending-article.jpg"
import profilePicture from "@/assets/images/profile-picture.jpg"
import Image from "next/image"

export default function TrendingArticle() {
    return (
        <>
        <div>
            <Image src={trendingArticle.src} alt={'Trending Article'} width={trendingArticle.width} height={trendingArticle.height} className={'h-[180px] rounded-xl'}></Image>
            <div className={'my-2 flex h-full items-center gap-5'}>
                <Image src={profilePicture.src} alt={'Profile Picture'} width={profilePicture.width} height={profilePicture.height} className={'aspect-w-1 aspect-h-1 h-[2.5rem] w-[2.5rem] rounded-[50%]'}></Image>
                <p className={'font-semibold'}>Donald Norman</p>
            </div>
            <p className={'text-lg font-bold'}>THE FUTURE OF HUMAN COMPUTER</p>
            <p className={'text-xs'}>Oct 24</p>
        </div>
        </>
    )
}