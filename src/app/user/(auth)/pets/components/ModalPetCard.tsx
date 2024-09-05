import { useUser } from "@/contexts/UserContext";
import { CreatePetSchema } from "@/utils/actions/AddPet";
import dayjs from "dayjs";
import { X } from "lucide-react";

export function ModalPetCard({ pet, handleOpen }: { pet: CreatePetSchema, handleOpen: () => void }) {

    const { session } = useUser()

    const formatarIdadeDoPet = (idadeEmMeses: number) => {
        if (idadeEmMeses >= 12) {
            const anos = Math.floor(idadeEmMeses / 12);
            const meses = idadeEmMeses % 12;
            const anosTexto = anos > 0 ? `${anos} ano${anos > 1 ? 's' : ''}` : '';
            const mesesTexto = meses > 0 ? `${meses} mes${meses > 1 ? 'es' : ''}` : '';
            return `${anosTexto}${anos > 0 && meses > 0 ? ' e ' : ''}${mesesTexto}`;
        } else {
            return `${idadeEmMeses} mes${idadeEmMeses > 1 ? 'es' : ''}`;
        }
    };

    return (
        <div className="absolute h-screen w-full flex items-center justify-center right-0 top-0 animate-fade-in">
            <div className="absolute h-screen w-full bg-black opacity-70 flex items-center justify-center right-0 top-0" />
            <div className="h-96 w-[550px] bg-white rounded-xl absolute px-8 py-10 flex flex-col justify-between items-center animate-fade-in">
                <button onClick={handleOpen} className="absolute -top-10 -right-10 text-zinc-300 hover:text-red-500 duration-300"><X className="size-7" strokeWidth={3}/></button>
                <h2 className="absolute top-5 right-5 font-bold text-brand-secondary text-lg">PetID</h2>

                <div className="flex gap-4 w-full">
                    <div className="h-44 w-40 bg-zinc-400 rounded-xl" />
                    <div className="h-full flex flex-col px-2 py-4 flex-1">
                        <div className="flex-1">
                            <h2 className="text-4xl font-semibold">{pet.name}</h2>
                            <h3 className="text-2xl font-semibold text-zinc-500">{pet.race}</h3>
                        </div>
                        <div className="flex justify-between w-full">
                            <div>
                                <h4 className="font-medium text-zinc-500 text-sm">Data de nascimento:</h4>
                                <h4 className="font-medium">{dayjs(pet.birthDate).format('DD/MM/YYYY')}</h4>
                            </div>
                            <div>
                                <h4 className="font-medium text-zinc-500 text-sm">Idade:</h4>
                                <h4 className="font-medium">{formatarIdadeDoPet(pet.age)}</h4>
                            </div>
                            <div>
                                <h4 className="font-medium text-zinc-500 text-sm">Sexo:</h4>
                                <h4 className="font-medium">{pet.sex === 'F' ? 'Femea' : 'Macho'}</h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <div className="flex justify-between">
                        <div>
                            <h4 className="font-medium text-zinc-500 text-sm">Dono:</h4>
                            <h4 className="font-medium">{session?.user?.name}</h4>
                        </div>
                        <div>
                            <h4 className="font-medium text-zinc-500 text-sm">Contato:</h4>
                            <h4 className="font-medium">{pet.userEmail}</h4>
                        </div>
                        <div>
                            <h4 className="font-medium text-zinc-500 text-sm">Cidade:</h4>
                            <h4 className="font-medium">{pet.city}</h4>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div>
                            <h4 className="font-medium text-zinc-500 text-sm">Observações:</h4>
                            <h4 className="font-medium">{pet.notes ? pet.notes : 'Não há observações sobre este pet'}</h4>
                        </div>
                        <div>
                            <h4 className="font-medium text-zinc-500 text-sm">Vacinas:</h4>
                            <h4 className="font-medium">{pet.vaccination ? pet.vaccination : 'Não há vacinas sobre este pet'}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}