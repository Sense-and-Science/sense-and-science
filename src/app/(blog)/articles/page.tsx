'use client';
import Article from '@/components/util/Article';
import { useArticlesStore } from '@/stores';

export default function Articles() {
  const { loadingPublishedArticles, publishedArticles } = useArticlesStore();

  return (
    <div>
      <h1 className='page-heading'>Articles</h1>
      <hr className='mb-4 lg:mb-6 xl:mb-8' />
      {loadingPublishedArticles ? (
        <p>Loading</p>
      ) : publishedArticles ? (
        <section className='article-gallery'>
          {publishedArticles.map((article) => {
            return <Article key={article.id} article={article} />;
          })}
        </section>
      ) : null}
    </div>
  );
}
