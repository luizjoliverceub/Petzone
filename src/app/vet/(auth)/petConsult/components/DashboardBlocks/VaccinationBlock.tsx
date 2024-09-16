import { CreatePetSchema } from "@/utils/actions/AddPet";

export function VaccinationBlock({ pet }: { pet: CreatePetSchema }) {
    return (
        <div className="border-2 p-8 rounded-xl flex flex-col gap-2 h-full w-full overflow-hidden">
            <h2 className="font-semibold text-zinc-700">Vacinas</h2>
            <div className={`flex flex-1 ${pet.vaccination.length ? '' : 'items-center justify-center'}`}>
                {
                    pet.vaccination.length
                        ? <p className="text-sm text-zinc-500 font-medium break-words">{pet.vaccination}</p>
                        : <p className="text-zinc-500 font-medium">Sem vacinas registradas sobre o {pet.name}</p>
                }
            </div>
        </div>
    )
}