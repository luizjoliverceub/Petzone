import { useUser } from "@/contexts/UserContext";
import { CreatePetSchema } from "@/utils/actions/AddPet";
import { removePetById } from "@/utils/actions/RemovePetById";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function RemovePet({ handleRemove, pet }: { handleRemove: () => void, pet: CreatePetSchema }) {
    const { handleAddPet } = useUser();
    const router = useRouter();

    async function handleRemovePet() {
        try {
            await removePetById(pet.id);
            toast.success('Pet removido com sucesso!');
            handleRemove();
            router.push('/user/pets');
            handleAddPet();
        } catch (error) {
            console.log(error);
            toast.error('Erro ao remover o pet.');
        }
    }

    return (
        <div className="w-[86.7%] h-full absolute animate-fade-in top-0">
            <div className="absolute w-full h-full z-0 bg-black opacity-60" />
            <div className="absolute w-full h-full flex flex-col items-center justify-center z-50">
                <div className="flex flex-col items-center justify-center gap-2">
                    <div className="flex flex-col px-6 py-8 rounded-xl bg-zinc-100 gap-8 relative items w-[500px]" >
                        <div className="flex flex-col gap-4">
                            <h2 className="text-brand-primary font-bold text-xl">Excluir Pet</h2>
                            <p className="font-medium text-zinc-600">Todas as informações de {pet.name} serão excluídas permanentemente. Deseja prosseguir?</p>
                        </div>
                        <div className="flex gap-2 justify-end">
                            <button
                                type="button"
                                onClick={handleRemovePet}
                                className="text-red-600 bg-transparent border-2 border-red-600 rounded-md px-4 py-1 font-semibold hover:text-zinc-50 hover:bg-red-600 hover:border-red-600 duration-300"
                            >
                                Excluir
                            </button>
                            <button
                                type="button"
                                onClick={handleRemove}
                                className="text-zinc-50 bg-brand-primary border-2 border-transparent rounded-md px-4 py-1 font-semibold hover:text-brand-primary hover:bg-transparent hover:border-brand-primary duration-300"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
