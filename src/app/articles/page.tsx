'use client';
import BlogPage from '@/components/layout/BlogPage';
import Article from '@/components/util/Article';
import { useArticlesStore } from '@/stores';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function Articles() {
  const { loadingPublishedArticles, publishedArticles } = useArticlesStore();

  return (
    <BlogPage>
      <div
        className='relative'
        style={{
          height:
            loadingPublishedArticles ||
            (!loadingPublishedArticles && publishedArticles?.length == 0)
              ? 'calc(100vh - 236px)'
              : 'auto',
        }}
      >
        <title>Articles | Sense & Science</title>
        <meta
          name='description'
          content='Articles of Sense & Science blog website'
        />
        <h1 className='page-heading mb-4 lg:mb-6 xl:mb-8'>Articles</h1>
        {loadingPublishedArticles ? (
          <div
            className='absolute flex flex-col  items-center justify-center gap-4'
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
            }}
          >
            <Icon
              icon={'svg-spinners:blocks-shuffle-3'}
              className='text-[5rem] opacity-[0.5]'
            ></Icon>
            <p className='text-center text-xl opacity-[0.5]'>Please wait</p>
          </div>
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
