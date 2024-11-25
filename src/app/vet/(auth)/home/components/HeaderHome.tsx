'use client'

import { useUser } from "@/contexts/UserContext"
import { Bell, Search, Settings } from "lucide-react"
import Link from "next/link"

export function HeaderHome() {
    const { session } = useUser()

    return (
        <div className="w-full px-8 pt-9 pb-4 animate-fade-in">
            <div className="flex justify-between items-center px-2">
                <h2 className="font-semibold text-2xl">Bem vindo <span className="text-vet-secondary">{session?.user?.name}</span></h2>

                <div className="flex gap-8 items-center justify-center">
                    <div className="hidden xl:flex shadow-lg rounded-lg justify-center items-center gap-2 px-3 py-2 group">
                        <label htmlFor="search">
                            <Search className="size-4 text-zinc-500 group-hover:text-vet-secondary duration-300" />
                        </label>
                        <input
                            type="text"
                            id="search"
                            className="outline-none text-sm w-72 text-medium bg-transparent"
                            placeholder="Pesquisar"
                        />
                    </div>

                    <div className="flex gap-5 items-center justify-center">
                        <button
                            className="p-1 h-8 w-8 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-vet-secondary hover:text-white duration-300"
                        >
                            <Bell className="size-4" strokeWidth={2} />
                        </button>

                        <Link
                            href={'/user/config'}
                            className="p-1 h-8 w-8 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-vet-secondary hover:text-white duration-300"
                        >
                            <Settings className="size-4" strokeWidth={2} />
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    )
}