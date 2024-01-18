'use client';

import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import parseHtml from 'html-react-parser';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import BlogPage from '@/components/layout/BlogPage';
import { services } from '@/services';
import { BlogArticleCompund } from '@/types';
import { Icon } from '@iconify/react/dist/iconify.js';

function removeEmptyPTags(htmlString: string): string {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;

  const emptyPTags = tempDiv.querySelectorAll('p');

  emptyPTags.forEach((emptyPTag) => {
    const isOnlyBR =
      emptyPTag.textContent?.trim() === '' &&
      emptyPTag.querySelectorAll(':not(br)').length === 0;

    if (isOnlyBR) {
      emptyPTag.parentNode?.removeChild(emptyPTag);
    }
  });

  return tempDiv.innerHTML;
}

export default function ArticlePage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const [article, setArticle] = useState<BlogArticleCompund | null>(null);
  const [loadingArticle, setLoadingArticle] = useState(true);

  function sleep() {
    return new Promise((res, rej) => {
      setTimeout(() => {
        res('');
      }, 1000000);
    });
  }

  async function loadArticle() {
    setLoadingArticle(true);
    const { result, error } = await services.articles.getPublishedArticleBySlug(
      decodeURIComponent(slug.trim())
    );
    if (result) {
      setArticle(result);
    } else if (!result && !error) {
      toast('Article not found', { type: 'error' });
    } else if (error) {
      console.log((error as Error).message);
      toast('Something went wrong', { type: 'error' });
    }
    setLoadingArticle(false);
  }

  useEffect(() => {
    loadArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BlogPage>
      <title>
        {article ? article.title : !loadingArticle ? 'Article not found - Sense & Science' : 'Loading, please wait'}
      </title>
      <meta
        name='description'
        content={
          article
            ? article.description
            : "Article wasn't found, please check if the url is invalid"
        }
      />
      <div
        className='relative'
        style={{
          height:
            loadingArticle || (!loadingArticle && !article) ? 'calc(100vh - 236px)' : 'auto',
        }}
      >
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
                className='article-cover-image mx-auto mb-4 block aspect-[2/1] w-full object-cover lg:mb-8'
              ></Image>
            )}
            <div className='article-body'>
              {parseHtml(removeEmptyPTags(article.content))}
            </div>
          </article>
        )}
        {loadingArticle && (
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
        )}

        {!loadingArticle && !article && (
          <div
            className='absolute flex flex-col  items-center justify-center gap-4'
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%,-50%)',
            }}
          >
            <Icon
              icon={'ant-design:frown-outlined'}
              className='text-[5rem] opacity-[0.5]'
            ></Icon>
            <p className='text-center text-xl opacity-[0.5]'>Article not found</p>
            <Link href={'/articles'} className='text-md text-center text-blue-500 underline'>Go Back</Link>
          </div>
        )}
      </div>
    </BlogPage>
  );
}
