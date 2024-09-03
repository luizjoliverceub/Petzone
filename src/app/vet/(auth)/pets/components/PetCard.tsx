import { CreatePetSchema } from "@/utils/actions/AddPet"
import Image from "next/image"
import petImg from '../../../../../../public/petCardPhoto.png'

export function PetCard({ pet }: { pet: CreatePetSchema }) {

    return (
        <div className="bg-zinc-400 flex gap-5 p-5 rounded-xl animate-fade-in">
            <div className="flex flex-col gap-3">
                <Image src={petImg} width={250} alt="Photo-pet" className="rounded-xl"/>
                <div className="flex flex-col gap-2">
                    <button className="px-4 py-1 border-2 rounded-lg flex-1">Agendar consulta</button>
                    <button className="px-4 py-1 border-2 rounded-lg">Copiar ID</button>
                </div>
            </div>
            <div>
                <h2 className="text-3xl font-medium">{pet.name}</h2>
                <div>
                    <h3 className="font-medium text-zinc-600">Data de nascimento: <span className="text-zinc-900">{String(pet.birthDate)}</span></h3>
                    <h3 className="font-medium text-zinc-600">Idade: <span className="text-zinc-900">{pet.age}</span></h3>
                </div>
            </div>
        </div>
    )
}
