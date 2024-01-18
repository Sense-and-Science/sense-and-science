'use client';

import Image from 'next/image';

import compsocLogo from '../../assets/images/compsoc-logo.webp';

export default function AppFooter() {
  return (
    <footer
      className={
        'mt-6 flex flex-col items-center justify-center  bg-[var(--bg-secondary)] px-4 py-[2rem] xl:px-6'
      }
    >
      <p className='mb-[2rem] text-right'>DEVELOPED AND MAINTEINED BY</p>
      <div className='flex w-[20rem] gap-3'>
        <Image
          src={compsocLogo.src}
          alt={'Compsoc-logo'}
          width={compsocLogo.width}
          height={compsocLogo.height}
          className='h-[36px] w-[36px] sm:h-[44px] sm:w-[44px] md:h-[50px] md:w-[50px]'
        ></Image>
        <p className='text-center md:text-left'>COMPUTER SCIENCE SOCIETY OF UNIVERSITY OF COLOMBO</p>
      </div>
    </footer>
  );
}
