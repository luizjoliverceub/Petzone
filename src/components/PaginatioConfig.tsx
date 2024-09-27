'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export function PaginationConfig() {
    const path = usePathname()
    const pathName = path.includes('/vet/config') ? true : false

    return (
        <div className="w-2/3 flex gap-4 px-2">
            <Link
                href={pathName ? '/vet/config/profile' : '/user/config'}
                className={`px-2 py-1 border-b-2
                    ${path === '/vet/config/profile' ? 'border-vet-secondary font-medium text-black' : 'border-transparent text-zinc-500'} 
                    ${path == '/user/config' ? 'border-brand-secondary font-medium text-black' : 'border-transparent'} 
                    ${pathName ? 'hover:border-vet-secondary' : 'hover:border-brand-secondary'} duration-300`}
            >
                Conta
            </Link>
            {pathName &&
                <Link
                    href={'/vet/config/services'}
                    className={`px-2 py-1 border-b-2 
                        ${path === '/vet/config/services' ? 'border-vet-secondary font-medium' : 'border-transparent text-zinc-500'} 
                        hover:border-vet-secondary duration-300`}
                >
                    Serviços
                </Link>}
        </div>
    )
}