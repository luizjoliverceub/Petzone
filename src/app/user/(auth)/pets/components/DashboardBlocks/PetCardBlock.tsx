import { CreatePetSchema } from "@/utils/actions/AddPet";
import { ExternalLink, View } from "lucide-react";

export function PetCardBlock({ pet, handleOpenPetCard }: { pet: CreatePetSchema, handleOpenPetCard: () => void }) {
    return (
        <div className="border-2 p-8 rounded-xl flex flex-col justify-between h-[436px] flex-1">
            <h2 className="font-semibold text-zinc-700">PetCard</h2>
            <div className="flex flex-col gap-4 w-full">
                <div className="w-full h-56 bg-brand-primary rounded-xl flex flex-col">
                    <div className="flex">
                        <div className="h-full w-36 flex flex-col pt-6 px-6 gap-3">
                            <div className="bg-zinc-300 rounded-xl h-28 w-28" />
                        </div>
                        <div className="px-2 py-12 flex flex-col">
                            <h3 className="text-white font-medium text-3xl">{pet.name}</h3>
                            <h4 className="text-zinc-400">{pet.race}</h4>
                        </div>
                    </div>
                    <div className="w-full h-full px-6 flex flex-col gap-2">
                        <div className="rounded w-full h-4 bg-zinc-300 animate-pulse" />
                        <div className="rounded w-full h-4 bg-zinc-300 animate-pulse" />
                    </div>
                </div>
                <div className="w-full border-2 rounded-lg h-12 flex gap-2 p-1 justify-center">
                    <button
                        className="px-2 py-1 rounded-md border-2 text-xs flex-1 flex gap-1 items-center justify-center font-medium text-brand-primary hover:bg-brand-secondary hover:text-white duration-300"
                        onClick={handleOpenPetCard}
                    >
                        Mostrar
                        <View className="size-4" />
                    </button>
                    <button
                        className="px-2 py-1 rounded-md border-2 text-xs flex-1 flex gap-1 items-center justify-center font-medium text-brand-primary hover:bg-brand-primary hover:text-white duration-300"
                    >
                        Compartilhar
                        <ExternalLink className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}