import { CreatePetSchema } from "@/utils/actions/AddPet";
import { Plus } from "lucide-react";
import Link from "next/link";

export function ConsultBlock({ pet }: { pet: CreatePetSchema }) {
    return (
        <div className="border-2 p-8 rounded-xl flex flex-col h-full w-1/3 flex-1">
            <div className="flex justify-between">
                <h2 className="font-semibold text-zinc-700">Consultas</h2>
                <Link href={'/user/consults'} className="flex gap-2 justify-center items-center p-1 text-brand-primary font-medium border-2 rounded-lg hover:bg-brand-primary hover:text-white hover:border-brand-primary duration-300">
                    <p className="text-xs hidden xl:flex ml-2">Agendar consulta</p>
                    <Plus className="size-4" />
                </Link>
            </div>
            <div className="w-full flex-1 flex items-center justify-center">
                <p className="font-medium text-zinc-500">Sem consultas registradas sobre o {pet.name}</p>
            </div>
        </div>
    )
}