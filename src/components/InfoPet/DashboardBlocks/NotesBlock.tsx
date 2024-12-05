import { CreatePetSchema } from "@/utils/actions/AddPet";

export function NotesBlock({ pet }: { pet: CreatePetSchema | undefined }) {
    return (
        <div className="border-2 p-8 rounded-xl flex flex-col gap-2 h-full w-full overflow-hidden">
            <h2 className="font-semibold text-zinc-700">Observações</h2>
            <div className={`flex flex-1 ${pet?.notes.length ? '' : 'items-center justify-center'}`}>
                {
                    pet?.notes.length
                        ? <p className="text-sm text-zinc-500 font-medium break-words overflow-hidden">{pet?.notes}</p>
                        : <p className="text-zinc-500 font-medium">Sem notas sobre o {pet?.name}</p>
                }
            </div>
        </div>
    )
}