import { CreatePetSchema } from "@/utils/actions/AddPet";
import dayjs from "dayjs";

export function PetInfoBlock({ pet }: { pet: CreatePetSchema }) {
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
        <div className="border-2 p-8 rounded-xl flex flex-col gap-2 max-h-[260px]">
            <h2 className="font-semibold text-zinc-700">Sexo</h2>
            <p className="text-wrap text-sm text-zinc-500 font-medium truncate">{pet.sex == 'M' ? 'Macho' : 'Femea'}</p >
            <h2 className="font-semibold text-zinc-700">Data de nascimento</h2>
            <p className="text-wrap text-sm text-zinc-500 font-medium truncate">{dayjs(pet.birthDate).format('DD/MM/YYYY')}</p >
            <h2 className="font-semibold text-zinc-700">Idade</h2>
            <p className="text-wrap text-sm text-zinc-500 font-medium truncate">{formatarIdadeDoPet(pet.age)}</p >
        </div>
    )
}