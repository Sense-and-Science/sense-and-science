'use client';
import LatestArticle from '@/components/util/LatestArticle';
import { useArticlesStore } from '@/stores';

export default function LatestArticles() {
  const { loadingPublishedArticles, publishedArticles } = useArticlesStore();

  return (
    <>
      {' '}
      {publishedArticles && (
        <section className={'w-full flex-col gap-6 py-4'}>
          <h1 className={'pb-4 text-[1.5rem] font-[700]'}>LATEST ARTICLE</h1>
          <div>
            {publishedArticles.map((pa) => {
              return <LatestArticle key={pa.id} article={pa} />;
            })}
          </div>
        </section>
      )}
    </>
  );
}
