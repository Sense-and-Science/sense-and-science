import compsocLogo from "../../assets/images/compsoc-logo.webp"
import Image from "next/image"

export default function AppFooter() {
    return (
        <footer className={'mt-6 flex space-x-96 pb-[3rem]'}>
            <div>
                <h1 className={'pb-4 text-[2.5rem] font-[700]'}>BECOME AN AUTHOR</h1>
                <p>REGISTER AS AN AUTHOR IF YOU ARE AN UNDERGRADUATE OF UNIVERSITY OF COLOMBO</p>
            </div>
            <div className={'justify-end'}>
                <p className="mb-[2rem] text-right">DEVELOPED AND MAINTEINED BY</p>
                <div className="flex w-[20rem] gap-3">
                    <Image src={compsocLogo.src} alt={'Compsoc-logo'} width={compsocLogo.width} height={compsocLogo.height} className="h-[50px] w-[50px]"></Image>
                    <p>COMPUTER SCIENCE SOCIETY OF UNIVERSITY OF COLOMBO</p>
                </div>
            </div>
        </footer>
    )

}