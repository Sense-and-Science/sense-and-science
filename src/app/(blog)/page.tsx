'use client';
import TrendingArticles from '@/components/blog/TrendingArticles';
import AuthorOfTheMonth from '@/components/page/home/AuthorOfTheMonth';
import Hero from '@/components/page/home/Hero';
import LatestArticles from '@/components/page/home/LatestArticles';
import SuggestedTags from '@/components/page/home/SuggestedTags';
import SectionHeading from '@/components/util/SectionHeading';
import TrendingArticle from '@/components/util/TrendingArticle';

export default function Home() {
    return (
        <>
            <Hero/>
            <SectionHeading>
                TRENDING ON SENSE AND SCIENCE
            </SectionHeading>
            <TrendingArticles />
            <div className={'mt-6 flex flex-col gap-6 xl:flex-row'}>
                <LatestArticles/>
                <div className={'flex w-full flex-col justify-stretch gap-6 md:flex-row xl:w-[34%] xl:flex-col'}>
                    <AuthorOfTheMonth/>
                    <SuggestedTags/>
                </div>
            </div>
        </>
    );
}
