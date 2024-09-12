import { ArrowLeft, BriefcaseMedical } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <div className="h-screen flex-1 flex items-center justify-center py-4 pr-4">
            <div className="w-full h-full border-2 flex rounded-xl py-8 px-10 animate-fade-in shadow-md items-center justify-center relative">
                <div className="flex flex-col gap-6 items-center justify-center">
                    <BriefcaseMedical className="size-16 bg-brand-secondary text-white p-2 rounded-xl" />
                    <div className="text-center">
                        <h2 className="font-bold text-4xl text-brand-primary">Bem vindo a suas consultas</h2>
                        <h3 className="font-semibold text-sm text-zinc-500">Para comecar selecione ao lado um veterinário de seu interesse!</h3>
                    </div>
                </div>
                <Link
                    href={'/user/consults'}
                    className="absolute left-4 top-4 text-zinc-500 hover:text-brand-secondary duration-300 flex gap-2"
                >
                    <ArrowLeft />
                    <span className="font-medium">Voltar</span>
                </Link>
            </div>
        </div>
    )
}