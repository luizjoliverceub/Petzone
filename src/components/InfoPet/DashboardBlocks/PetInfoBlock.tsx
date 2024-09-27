import { PetType, useUser } from "@/contexts/UserContext";
import dayjs from "dayjs";
import { ExternalLink, View } from "lucide-react";
import { Session } from "next-auth";

export function PetInfoBlock({ pet, handleOpenPetCard }: { pet: PetType, handleOpenPetCard: () => void }) {
    const { session } = useUser()

    const formatarIdadeDoPet = (idadeEmMeses: number) => {
        if (idadeEmMeses >= 12) {
            const anos = Math.floor(idadeEmMeses / 12);
            const meses = idadeEmMeses % 12;
            const anosTexto = anos > 0 ? `${anos} ano${anos > 1 ? 's' : ''}` : '';
            const mesesTexto = meses > 0 ? `${meses} mês${meses > 1 ? 'es' : ''}` : '';
            return `${anosTexto}${anos > 0 && meses > 0 ? ' e ' : ''}${mesesTexto}`;
        } else {
            return `${idadeEmMeses} mes${idadeEmMeses > 1 ? 'es' : ''}`;
        }
    };

    return (
        <div className="border-2 p-8 rounded-xl flex flex-col gap-2 h-full w-full">
            <h2 className="font-semibold text-zinc-700">Informações</h2>
            <div className="flex flex-col gap-2 justify-center h-full">
                <div className="flex flex-col gap-8 h-full justify-center">
                    <div className="flex justify-between">
                        <div>
                            <h2 className="font-semibold text-zinc-700">Sexo</h2>
                            <p className="text-wrap text-sm text-zinc-500 font-medium truncate">{pet.sex == 'M' ? 'Macho' : 'Femea'}</p >
                        </div>
                        <div>
                            <h2 className="font-semibold text-zinc-700">Dono</h2>
                            <p className="text-wrap text-sm text-zinc-500 font-medium truncate">{pet.user.name}</p >
                        </div>
                        <div>
                            <h2 className="font-semibold text-zinc-700">Localização</h2>
                            {
                                pet.city.length
                                    ? <p className="text-wrap text-zinc-500 font-medium truncate text-sm">{pet.city}</p >
                                    : <p className="text-wrap text-zinc-500 font-medium truncate text-sm">Ainda não uma Localização salva</p>
                            }
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <div>
                            <h2 className="font-semibold text-zinc-700">Data de nascimento</h2>
                            <p className="text-wrap text-sm text-zinc-500 font-medium truncate">{dayjs(pet.birthDate).format('DD/MM/YYYY')}</p >
                        </div>
                        <div>
                            <h2 className="font-semibold text-zinc-700">Idade</h2>
                            <p className="text-wrap text-sm text-zinc-500 font-medium truncate">{formatarIdadeDoPet(pet.age)}</p >
                        </div>
                        <div>
                            <h2 className="font-semibold text-zinc-700">Raça</h2>
                            <p className="text-wrap text-zinc-500 font-medium truncate text-sm">{pet.race}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full border-2 rounded-lg h-12 flex gap-2 p-1 justify-center">
                    <button
                        className={`px-2 py-1 rounded-md border-2 text-xs flex-1 flex gap-1 items-center justify-center font-medium text-brand-primary 
                            ${session?.user?.role === 'normal' ? 'hover:bg-brand-secondary' : 'hover:bg-vet-primary'} hover:text-white duration-300`}
                        onClick={handleOpenPetCard}
                    >
                        Mostrar
                        <View className="size-4" />
                    </button>
                    {
                        session?.user?.role === 'normal' &&
                        <button
                            className="px-2 py-1 rounded-md border-2 text-xs flex-1 flex gap-1 items-center justify-center font-medium text-brand-primary hover:bg-brand-primary hover:text-white duration-300"
                        >
                            Compartilhar
                            <ExternalLink className="size-4" />
                        </button>
                    }
                </div>
            </div>
        </div>
    )
}