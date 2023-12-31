import LatestArticle
 from "@/components/util/LatestArticle"
export default function LatestArticles() {
    return <section className={'h-[900px] w-full flex-col gap-6 py-4'}>
        <h1 className={'pb-4 text-[1.5rem] font-[700]'}>LATEST ARTICLE</h1>
       <LatestArticle/> 
       <LatestArticle/> 
       <LatestArticle/> 
       <LatestArticle/> 
       <LatestArticle/> 

    </section>
}