import { Check, Copy, Settings } from "lucide-react";
import { CreatePetSchema } from "@/utils/actions/AddPet";

export function PetIdBlock({ pet }: { pet: CreatePetSchema | undefined }) {
    return (
        <div className="border-2 rounded-xl px-4 py-4 flex flex-col gap-4 items-center justify-center h-full w-[40%]">
            <div>
                <div className="w-48 h-48 rounded-full bg-zinc-300"></div>
            </div>
            <div className="flex flex-col text-center">
                <h2 className="w-auto font-semibold text-2xl flex gap-1 items-center justify-center relative">{pet?.name}
                </h2>
                <h3 className="font-medium text-lg text-zinc-400">{pet?.race}</h3>
            </div>
        </div>
    )
}