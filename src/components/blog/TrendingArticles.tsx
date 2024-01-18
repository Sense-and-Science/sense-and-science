import TrendingArticle from '@/components/util/TrendingArticle';
import { useArticlesStore } from '@/stores';

export default function TrendingArticles() {
  const { loadingPublishedArticles, publishedArticles } = useArticlesStore();

  const trendingArticles = publishedArticles?.slice(0, 5);

  return (
    <>
      {trendingArticles && (
        <section
          className={'article-gallery'}
        >
          {trendingArticles.map((ta) => {
            return <TrendingArticle key={ta.id} article={ta} />;
          })}
        </section>
      )}{' '}
    </>
  );
}
