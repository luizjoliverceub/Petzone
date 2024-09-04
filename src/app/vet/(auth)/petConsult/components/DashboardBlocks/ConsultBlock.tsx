import { CreatePetSchema } from "@/utils/actions/AddPet";
import { Plus } from "lucide-react";
import Link from "next/link";

export function ConsultBlock({ pet }: { pet: CreatePetSchema }) {
    return (
        <div className="border-2 p-8 rounded-xl flex flex-col min-h-[352px] min-w-[300px] flex-1">
            <div className="flex justify-between">
                <h2 className="font-semibold text-zinc-700">Consultas</h2>
            </div>
            <div className="w-full flex-1 flex items-center justify-center">
                <p className="font-medium text-zinc-500">Sem consultas registradas sobre o {pet.name}</p>
            </div>
        </div>
    )
}