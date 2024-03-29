'use client';
import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';

import { BlogArticleBrief } from '@/types';

interface LatestArticleProps {
  article: BlogArticleBrief;
}

export default function LatestArticle({ article }: LatestArticleProps) {
  const {
    updatedAt,
    title,
    authorName,
    authorAvatar,
    description,
    coverImage,
    slug,
  } = article;
  return (
    <>
      <Link
        href={`/articles/${slug}`}
        className={'latest-article flex flex-col items-center gap-6 sm:flex-row'}
      >
        <Image
          src={coverImage || ''}
          alt={'Latest Article'}
          width={130}
          height={130}
          className={'sm:aspect-square] aspect-[3/1.6] w-full rounded-lg  object-cover sm:h-[130px] sm:w-[130px] sm:p-4'}
        ></Image>
        <div>
          <div className={'my-1 flex items-center gap-5'}>
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
          <p className={'text-lg font-bold'}>{title}</p>
          <p className={'text-sm'}>{description.slice(0, 63) + '...'}</p>
          <span className={'text-xs'}>
            <em>
              {format(updatedAt.toDate(), 'MMM dd, yyyy', { locale: enUS })}
            </em>
          </span>
        </div>
      </Link>
      <hr className={'my-4'} />
    </>
  );
}
