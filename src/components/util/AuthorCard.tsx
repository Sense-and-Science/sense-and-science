import Image from 'next/image';

import { BlogUserCompound, BlogUserRole } from '@/types';

export interface AuthorCardProps {
  author: BlogUserCompound;
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const { avatarUrl, firstName, lastName, contactNo, role } = author;

  const fullName = `${firstName} ${lastName}`;

  return (
    <div className='flex w-full max-w-[400px] flex-col items-center justify-center sm:w-[200px]'>
      <Image
        src={avatarUrl || ''}
        width={200}
        height={200}
        alt={`${fullName}'s avatar`}
        className='aspect-[280/336] h-auto w-full rounded-[12px] object-cover'
      ></Image>
      <h3 className='text-lg font-bold'>{fullName}</h3>
      <span>{role === BlogUserRole.ADMIN ? 'Admin / Author' : 'Author'}</span>
    </div>
  );
}
