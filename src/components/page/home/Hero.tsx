'use client';
import Image from 'next/image';
import { CSSProperties } from 'react';

import compsocLogo from '@/assets/images/compsoc-logo.webp';
import heroBg from '@/assets/images/hero-bg.webp';
import heroOverlay from '@/assets/images/hero-overlay.webp';

export default function Hero() {
  const heroStyle: CSSProperties = {
    backgroundImage: `linear-gradient(to left,rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBg.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '500px',
    overflowY: 'hidden',
  };

  return (
    <div
      style={heroStyle}
      className={
        'relative z-0 flex  flex-col items-center justify-center  rounded-[14px] px-[40px] sm:rounded-[16px] md:items-start md:rounded-[24px] xl:rounded-[30px]'
      }
    >
      <h1
        className={
          'font-500 z-10 flex flex-col text-center text-[1.5rem] text-[#fff] md:text-left md:text-[2rem]'
        }
      >
        WELCOME TO THE
        <span
          className={
            'font-700 mt-4 text-[36px] leading-[36px] sm:leading-[28px] md:mt-0 md:text-[48px] md:leading-[70px] lg:text-[56px] xl:text-[70px]'
          }
        >
          UNIVERSITY OF COLOMBO
        </span>
        <span
          className={
            'font-700 mt-4 text-[36px] md:mt-0 md:text-[48px] lg:text-[56px] xl:text-[70px]'
          }
        >
          TECH AND SCIENCE BLOG
        </span>
      </h1>
      <div className={'mt-4 flex items-center gap-2'}>
        <Image
          src={compsocLogo.src}
          alt={'Compsoc Logo'}
          width={compsocLogo.width}
          height={compsocLogo.height}
          className={'h-[2.8rem] w-[2.8rem]'}
        />
        <p className='text-white'>
          COMPUTER SCIENCE SOCIETY <br></br> OF UNIVERSITY OF COLOMBO
        </p>
      </div>
      <Image
        src={heroOverlay.src}
        alt={'Girl wearing a VR headset looking at future'}
        width={heroOverlay.width}
        height={heroOverlay.height}
        className={
          'absolute right-[4rem] top-[50%] -z-10 h-[500px] w-[500px] translate-y-[-50%]'
        }
      />
    </div>
  );
}
