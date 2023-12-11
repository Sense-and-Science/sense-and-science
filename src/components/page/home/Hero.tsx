import heroBg from '@/assets/images/hero-bg.webp'
import compsocLogo from "@/assets/images/compsoc-logo.webp"
import heroOverlay from "@/assets/images/hero-overlay.webp"
import {CSSProperties} from "react";
import Image from "next/image";

export default function Hero() {

    const heroStyle: CSSProperties = {
        backgroundImage: `linear-gradient(to left,rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroBg.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '500px',
        overflowY: 'hidden'
    }

    return <div style={heroStyle}
                className={'relative z-0 mx-4 flex  flex-col items-center justify-center  rounded-[14px] px-[40px] sm:rounded-[16px] md:items-start md:rounded-[24px] xl:mx-6 xl:rounded-[30px]'}>
        <h1 className={'font-500 z-10 flex flex-col text-center text-[1.5rem] text-[#fff] md:text-left md:text-[2rem]'}>WELCOME
            TO THE
            <span className={'font-700 text-[48px] leading-[20px] md:text-[70px] md:leading-[70px]'}>UNIVERSITY OF COLOMBO</span>
            <span className={'font-700 text-[48px] md:text-[70px]'}>TECH AND SCIENCE BLOG</span>
        </h1>
        <div className={'mt-4 flex items-center gap-2'}>
            <Image src={compsocLogo.src} alt={'Compsoc Logo'} width={compsocLogo.width} height={compsocLogo.height}
                   className={'h-[2.8rem] w-[2.8rem]'}/>
            <p>COMPUTER SCIENCE SOCIETY <br></br> OF UNIVERSITY OF COLOMBO</p>
        </div>
        <Image src={heroOverlay.src} alt={'Girl wearing a VR headset looking at future'} width={heroOverlay.width}
               height={heroOverlay.height}
               className={'absolute right-[4rem] top-[50%] -z-10 h-[500px] w-[500px] translate-y-[-50%]'}/>
    </div>
}