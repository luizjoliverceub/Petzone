import { CreatePetSchema } from "@/utils/actions/AddPet";

export function UserBlock({ pet }: { pet: CreatePetSchema | null }) {
    return (
        <div className="border-2 rounded-xl p-8 flex flex-col gap-4">
            <div>
                <h2 className="font-semibold text-zinc-700">Dono</h2>
                <p className="text-wrap text-zinc-500 font-medium truncate">{pet?.userEmail}</p>
            </div>
            <div>
                <h2 className="font-semibold text-zinc-700">Localização</h2>
                {
                    pet?.city.length
                        ? <p className="text-wrap text-zinc-500 font-medium truncate">{pet?.city}</p >
                        : <p className="text-wrap text-zinc-500 font-medium truncate">Ainda não uma Localização salva</p>
                }
            </div>
        </div>
    )
}