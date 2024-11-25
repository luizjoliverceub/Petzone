import { MessageCircle } from "lucide-react";

export default function Home() {
    return (
        <div className="h-screen flex-1 flex items-center justify-center py-4 pr-4">
            <div className="w-full h-full border-2 flex rounded-xl py-8 px-10 animate-fade-in shadow-md items-center justify-center">
                <div className="flex flex-col gap-6 items-center justify-center">
                    <MessageCircle className="size-16 bg-vet-secondary text-white p-2 rounded-xl" />
                    <div className="text-center">
                        <h2 className="font-bold text-4xl text-brand-primary">Bem vindo ao bate-papo</h2>
                        <h3 className="font-semibold text-sm text-zinc-500">Para comecar selecione ao lado um bate-papo de seu interesse!</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}