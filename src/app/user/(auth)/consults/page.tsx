import { BriefcaseMedical } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="h-screen flex-1 flex items-center justify-center py-4 pr-4">
            <div className="w-full h-full border-2 flex rounded-xl py-8 px-10 animate-fade-in shadow-md items-center justify-center">
                <div className="flex flex-col gap-6 items-center justify-center">
                    <BriefcaseMedical className="size-16 bg-brand-secondary text-white p-2 rounded-xl" />
                    <div className="text-center">
                        <h2 className="font-bold text-4xl text-brand-primary">Bem vindo PetConsultas</h2>
                        <h3 className="font-semibold text-sm text-zinc-500">Para comecar selecione ao lado um veterinário de seu interesse!</h3>
                    </div>
                    <Link
                        href={'/user/consults/allConsults'}
                        className="rounded-md px-4 py-1 bg-brand-secondary border-2 border-transparent text-white font-semibold hover:bg-transparent hover:border-brand-secondary hover:text-brand-secondary duration-300"
                    >
                        Ver suas consultas
                    </Link>
                </div>
            </div>
        </div>
    )
}