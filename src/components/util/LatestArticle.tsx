import latestArticle from '@/assets/images/latest-article.jpg'
import profilePicture from '@/assets/images/profile-picture.jpg'
import Image from "next/image"
import SectionHeading from './SectionHeading'

export default function LatestArticle() {
    return (
        <>
            <div className={'flex items-center gap-6'}>
                <Image src={latestArticle.src} alt={'Latest Article'} width={latestArticle.width} height={latestArticle.height} className={'h-[130px] w-[130px] rounded-lg'}></Image>
                <div>
                    <div className={'my-1 flex items-center gap-5'}>
                        <Image src={profilePicture.src} alt={'Profile Picture'} width={profilePicture.width} height={profilePicture.height} className={'aspect-w-1 aspect-h-1 h-[2.5rem] w-[2.5rem] rounded-[50%]'}></Image>
                        <p className={'font-semibold'}>Donald Norman</p>
                    </div>
                    <p className={'text-lg font-bold'}>Introducting Angular V17</p>
                    <p className={'text-md font-semibold'}>Last month marked the 13th anniversary of Angulars red shield.</p>
                    <p className={'text-xs'}>Nov 04</p>
                </div>
                
            </div>
            <hr className={'my-4'}/>
        </>
    )
}