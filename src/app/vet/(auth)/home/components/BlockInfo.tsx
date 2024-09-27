import { ArrowRight, LucideProps } from "lucide-react";
import Link from "next/link";
import { ForwardRefExoticComponent, RefAttributes } from "react";

type BlockInfoProps = {
    title: string 
    Icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    href: string
    value: number | null | undefined
    isLoading?: boolean
}

export function BlockInfo({ title, Icon, href, value, isLoading }: BlockInfoProps) {
    return (
        <Link
            className="animate-fade-in shadow-custom2 w-[450px] h-32 rounded-xl p-5 flex flex-col bg-zinc-50 gap-3 hover:shadow-custom3 duration-300 group"
            href={href}
        >
            <div className="flex justify-between items-center text-zinc-500 group-hover:text-vet-secondary duration-300">
                <h3 className="font-medium">{title}</h3>
                <ArrowRight className="size-5" />
            </div>
            <div className="flex h-full items-center gap-3">
                <Icon className="text-zinc-600 p-1.5 rounded-full border-[1.5px] size-8 group-hover:text-vet-secondary duration-300" />
                {
                    isLoading ? 
                    <div className="h-9 w-40 rounded-xl bg-zinc-300 animate-pulse"/> :
                    <span className="text-3xl font-semibold">{value || 0}</span>
                }
            </div>
        </Link>
    )
}