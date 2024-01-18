'use client';
import BlogPage from '@/components/layout/BlogPage';
import Article from '@/components/util/Article';
import { useArticlesStore } from '@/stores';

export default function Authors() {
  const { loadingPublishedArticles, publishedArticles } = useArticlesStore();

  return (
    <BlogPage>
      <div>
        <title>Authors | Sense & Science</title>
        <meta
          name='description'
          content='Authors of Sense & Science blog website'
        />
        <h1 className='page-heading'>Authors</h1>
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
    </BlogPage>
  );
}
