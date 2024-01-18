import Image from 'next/image';

import { BlogUserCompound, BlogUserRole } from '@/types';

export interface DeveloperCardProps {
  developer: BlogUserCompound;
}

export default function DeveloperCard({ developer }: DeveloperCardProps) {
  const { avatarUrl, firstName, lastName, contactNo, role } = developer;

  const fullName = `${firstName} ${lastName}`;

  return (
    <div className='flex w-full flex-col items-center justify-center md:w-[200px]'>
      <Image
        src={avatarUrl || ''}
        width={200}
        height={200}
        alt={`${fullName}'s avatar`}
        className='aspect-[280/336] h-auto w-full object-cover'
      ></Image>
      <h3 className='text-lg font-bold'>{fullName}</h3>
      <span>Developer</span>
    </div>
  );
}
