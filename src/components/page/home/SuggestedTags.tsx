"use client"
import DiscoverButton from '@/components/util/DiscoverButton';

export default function SuggestedTags() {
    return (
        <section className={'h-[300px] items-center md:w-[50%] xl:h-[40%] xl:w-auto'}>
            <h1 className={'pb-4 text-right text-[1.5rem] font-[700]'}>DISCOVERE MORE OF WHAT MATTER TO YOU</h1>
            <div className="flex justify-end gap-4">
                <DiscoverButton />
                <DiscoverButton />
            </div>

        </section>
    )


}