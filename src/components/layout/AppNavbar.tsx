import Link from "next/link";

const links = [
    {
        text: "HOME",
        href: "/"
    },
    {
        text: "NEWS",
        href: "/news"
    }, {
        text: "ARTICLES",
        href: "/articles"
    },
    {
        text: "AUTHORS",
        href: "/authors"
    }
] as const

export default function AppNavbar() {


    return <nav className={'flex py-6 text-[18px] font-[500]'}>
        <ul className={'flex items-center gap-10'}>
            {
                links.map(link => {
                    return <li key={link.text}>
                        <Link href={link.href} className={'hover:underline'}>
                            {link.text}
                        </Link>
                    </li>
                })
            }
        </ul>
    </nav>
}