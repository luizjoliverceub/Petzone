'use client'

import { ButtonNav } from "@/app/vet/(auth)/components/ButtonNav";
import { LogOutButton } from "@/components/LogOutButton";
import { useUser } from "@/contexts/UserContext";
import { Activity, EllipsisVertical, House, MessageCircle, Newspaper, PawPrint } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect, usePathname } from "next/navigation";
import { useState } from "react";

export function NavBarApp() {
    const [open, setOpen] = useState(false)
    const { pets } = useUser()
    const { data: session } = useSession()
    const path = usePathname()

    const capitalize = (text: string) => {
        return text.toLowerCase().replace(/\b./g, function (a) { return a.toUpperCase(); })
    }

    if (session?.user.role !== 'veterinarian') {
        redirect('/welcome')
    }

    return (
        <nav className="h-full min-w-64 bg-vet-primary px-4 pb-4 pt-8 flex flex-col justify-between fixed">
            <div className="w-full flex flex-col gap-12">
                <div className="px-4">
                    <h2 className="font-semibold text-2xl text-vet-secondary">Petzone</h2>
                </div>
                <div className="w-full flex flex-col gap-2">
                    <ButtonNav title="Inicio" icon={House} href="/vet/home" path={path} />
                    <ButtonNav title="Mensagens" icon={MessageCircle} isChat href="/vet/message" path={path} />
                    <ButtonNav title="Meus Pets" icon={PawPrint} href={pets.length ? `/vet/pets/${pets[0].id}` : '/vet/pets'} path={path} />
                    <ButtonNav title="Consultas" icon={Activity} href="/vet/consults" path={path} />
                    <ButtonNav title="Noticias e Dicas" icon={Newspaper} href="/vet/newsletter" path={path} />
                </div>
            </div>
            <div>
                <button className="flex w-full items-center gap-4 px-4 py-2 rounded-xl hover:bg-vet-third duration-300" onClick={() => setOpen(!open)}>
                    <div className="flex items-center gap-4 flex-1 text-start">
                        {
                            session?.user?.image ?
                                <Image src={session.user.image} alt="user" height={32} className="rounded-full" /> :
                                <div className="h-8 w-8 bg-zinc-200 rounded-full" />
                        }
                        <h2 className="flex-1 text-white font-medium">{session?.user?.name}</h2>
                    </div>
                    <EllipsisVertical className="size-4 text-white" strokeWidth={2.5} />
                </button>
                {open &&
                    <div className="flex flex-col gap-2 w-48 p-2 bg-zinc-100 border-2 border-zinc-300 absolute bottom-[70px] left-12 rounded-md animate-fade-in">
                        <div>
                            <h2 className="font-medium">{session?.user ? capitalize(session?.user?.name as any) : 'User'}</h2>
                            <h3 className="text-sm font-medium text-zinc-500">{session?.user?.email}</h3>
                        </div>

                        <div className="h-0.5 w-full bg-zinc-700 rounded-full" />

                        <LogOutButton />
                    </div>
                }
            </div>
        </nav>
    )
}