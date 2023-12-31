import profilePicture from "@/assets/images/profile-picture.jpg"
import authorMonth from "@/assets/images/author-month.jpg"
import Image from "next/image"

export default function AuthorOfTheMonth() {
    return (
        <section className={'white h-[300px] items-center justify-center rounded-lg border-[1.2px] border-solid text-center md:w-[50%] xl:h-[60%] xl:w-auto'}>
            <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${authorMonth.src})`, backgroundSize: 'cover', backgroundPosition: 'center'}} className="rounded-t-xl px-[1rem] py-[3rem]">
                <h1 className={'pb-4 text-[1.5rem] font-[700] text-white'}>AUTHOR OF THE MONTH</h1>
                <div className="flex items-center justify-center">
                    <Image src={profilePicture.src} alt={'Profile Picture'} width={profilePicture.width} height={profilePicture.height} className="w-[200px] rounded-lg py-[1rem]"></Image>
                </div>
            </div>
            <p className="pt-[2rem] text-xl font-bold">PAUL MCCARTNEY</p>
            <p className="pt-[1rem]">SnS Writer</p>
        </section>
    )
}