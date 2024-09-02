import { LucideProps } from "lucide-react";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export function ButtonNav({ title, icon: Icon, isChat = false, href, path }: { title: string, icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>, isChat?: boolean, href: string, path: string }) {
    const hrefSliced = href.slice(0,9)
    const params = path.includes(hrefSliced)

    return (
        <Link href={href} className={`flex items-center gap-4 w-full px-4 py-3 rounded-xl ${params ? 'bg-brand-secondary' : 'hover:bg-brand-secondary hover:shadow-sm hover:shadow-brand-secondary'} relative duration-300`}>
            <Icon className="size-5 text-white" strokeWidth={2.5} />
            <span className="font-medium text-white">{title}</span>
            {isChat && <div className="bg-red-700 h-4 w-4 rounded-full flex justify-center items-center absolute top-2 left-7">
                <span className="text-[10px] font-medium text-white ">3</span>
            </div>}
        </Link>
    )
}