'use client';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import { BlogArticleBrief } from '@/types';

interface ArticleProps {
  article: BlogArticleBrief;
}

export default function Article({ article }: ArticleProps) {
  const { authorName, title, updatedAt, authorAvatar } = article;

  return (
    <>
      <Link href={`/articles/${article.slug}`} className='article flex flex-col'>
        <Image
          src={article.coverImage || ""}
          alt={'Trending Article'}
          width={300}
          height={180}
          className={'article-cover-image-preview object-cover'}
        ></Image>
        <div className={'my-2 flex h-full items-center gap-5'}>
          <Image
            src={authorAvatar || ''}
            alt={'Profile Picture'}
            width={60}
            height={60}
            className={
              'aspect-w-1 aspect-h-1 h-[2.5rem] w-[2.5rem] rounded-[50%] object-cover'
            }
          ></Image>
          <p className={'font-semibold'}>{authorName}</p>
        </div>
        <h3 className={'text-wrap text-[20px] font-bold'}>{title}</h3>
        <p className={'mt-2 text-[12px]'}>
          {format(updatedAt.toDate(), 'MMM dd, yyyy', { locale: enUS })}
        </p>
      </Link>
    </>
  );
}
