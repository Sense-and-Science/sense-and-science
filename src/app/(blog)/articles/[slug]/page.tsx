'use client';

import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import parseHtml from 'html-react-parser';
import Image from 'next/image';

import { useArticlesStore } from '@/stores';

export default function ArticlePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { getArticle } = useArticlesStore();
  const article = getArticle(decodeURIComponent(slug));
  return (
    <>
      <title>
        {article ? article.title : 'Article not found - Sense & Science'}
      </title>
      <meta
        name='description'
        content={
          article
            ? article.description
            : "Article wasn't found, please check if the url is invalid"
        }
      />
      <div>
        {!article ? null : (
          <article className='flex flex-col'>
            <h1 className='article-title'>{article.title}</h1>
            <div>
              <span className={'mt-2 text-[12px]'}>
                {format(article.createdAt.toDate(), 'MMM dd, yyyy', {
                  locale: enUS,
                })}
              </span>
              <div className={'my-4 flex h-full items-center gap-5'}>
                <Image
                  src={article.authorAvatar || ''}
                  alt={'Profile Picture'}
                  width={60}
                  height={60}
                  className={
                    'aspect-w-1 aspect-h-1 h-[2.5rem] w-[2.5rem] rounded-[50%]'
                  }
                ></Image>
                <p className={'font-semibold'}>{article.authorName}</p>
              </div>
            </div>
            {article.coverImage && (
              <Image
                src={article.coverImage}
                width={1280}
                height={720}
                alt={`Cover image of ${article.title}`}
                className='mx-auto block w-full object-cover mb-4 lg:mb-8 article-cover-image'
              ></Image>
            )}
            <div className='article-body'>{parseHtml(article.content)}</div>
          </article>
        )}
      </div>
    </>
  );
}
