"use client"
import LatestArticle from '@/components/util/LatestArticle';

export default function LatestArticles() {
    return <section className={'h-[900px] w-full flex-col gap-6 py-4'}>
        <h1 className={'pb-4 text-[1.5rem] font-[700]'}>LATEST ARTICLE</h1>
       <LatestArticle writerName="Donal Norman" title="Introducing Angular V17" caption="Last month marked the 13th anniversary of Angular's Red shield." date="Nov 07"/> 
       <LatestArticle writerName="Donal Norman" title="Introducing Angular V17" caption="Last month marked the 13th anniversary of Angular's Red shield." date="Nov 07"/> 
       <LatestArticle writerName="Donal Norman" title="Introducing Angular V17" caption="Last month marked the 13th anniversary of Angular's Red shield." date="Nov 07"/> 
       <LatestArticle writerName="Donal Norman" title="Introducing Angular V17" caption="Last month marked the 13th anniversary of Angular's Red shield." date="Nov 07"/> 
       <LatestArticle writerName="Donal Norman" title="Introducing Angular V17" caption="Last month marked the 13th anniversary of Angular's Red shield." date="Nov 07"/> 

    </section>
}