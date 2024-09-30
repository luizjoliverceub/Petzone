'use client'

import { CreatePetSchema } from "@/utils/actions/AddPet";
import { LoaderCircle, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { FormVaccination } from "./FormVaccination";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getVaccines } from "@/utils/actions/VaccinesByPet";
import { parseDate } from "@/utils/actions/ParseDate";
import { deleteVaccine } from "@/utils/actions/DeleteVaccine";
import { queryClient } from "@/hooks/useQuery";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";

interface PetType extends CreatePetSchema {
    vaccinations: {
        id: string
        name: string
        petId: string
    }[]
}

interface VaccineType {
    id: string
    name: string
    petId: string
    data: Date
}

export function VaccinationBlock({ pet }: { pet: PetType }) {
    const [open, setOpen] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [vaccine, setVaccine] = useState<VaccineType>()
    const { session } = useUser()

    const { data, isLoading } = useQuery({
        queryKey: ['vaccines', pet.id],
        queryFn: async () => {
            const data: VaccineType[] = await getVaccines(pet.id)

            return data
        },
        enabled: !!pet.id
    })

    const deleteMutation = useMutation({
        mutationFn: deleteVaccine,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['vaccines', pet.id] })
            toast.success('Vacina excluida com sucesso!')
            handleModal()
        },
        onError: (error) => {
            console.error("Erro ao deletar vacina:", error);
            alert("Erro ao deletar a vacina");
        },
    });

    console.log(data)

    const handleOpen = () => {
        setOpen(!open)
    }

    const handleDelete = () => {
        deleteMutation.mutate(vaccine?.id || '')
    }

    const handleModal = (vacc?: VaccineType) => {
        setVaccine(vacc)
        setOpenModal(!openModal)
    }

    return (
        <div className="border-2 p-8 rounded-xl flex flex-col gap-4 max-h-[410px] w-1/3 overflow-hidden relative">
            <div className="flex items-center gap-2 relative">
                <h2 className="font-semibold  text-zinc-700">Vacinas</h2>
                {
                    session?.user?.role === 'normal' &&
                    <button
                        type="button"
                        onClick={handleOpen}
                        className="flex gap-2 justify-center items-center p-1 text-brand-primary font-medium border-2 rounded-lg hover:bg-brand-primary hover:text-white hover:border-brand-primary duration-300"
                    >
                        <Plus className="size-3.5" strokeWidth={3} />
                    </button>
                }
                {open &&
                    <FormVaccination petId={pet.id} handleOpen={handleOpen} />
                }
            </div>
            <div className={`flex flex-col flex-1 ${data && data?.length > 0 ? 'overflow-y-auto' : 'items-center justify-center'}`}>
                {
                    isLoading &&
                    <div className="flex flex-col gap-2 w-full">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="bg-zinc-300 w-full h-[58px] rounded-md animate-pulse"
                            />
                        ))}
                    </div>
                }

                {
                    data && data?.length > 0 && !isLoading
                        ? <div className="flex flex-col gap-2 px-2 font-medium break-words">{data?.map(vacc => (
                            <div
                                key={vacc.id}
                                className='border px-4 py-2 rounded-md flex justify-between items-center animate-fade-in'
                            >
                                <div className="flex gap-4">
                                    <h3 className="text-zinc-500 text-xs">Nome: <p className="text-zinc-700 text-base">{vacc.name}</p></h3>
                                    <h3 className="text-zinc-500 text-xs">Data: <p className="text-zinc-700 text-base">{parseDate(vacc.data)}</p></h3>
                                </div>
                                {session?.user?.role === 'normal' &&
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleModal(vacc)}
                                            className="p-1 bg-red-100 text-red-600 rounded-md hover:bg-red-600 hover:text-white duration-300"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                        <button
                                            type="button"
                                            className="p-1 bg-zinc-200 text-zinc-600 rounded-md hover:bg-zinc-600 hover:text-white duration-300"
                                        >
                                            <Pencil className="size-4" />
                                        </button>
                                        {openModal &&
                                            <div className="bg-black/25 absolute top-0 right-0 h-full w-full duration-300 flex items-center justify-center animate-fade-in">
                                                <div
                                                    className="w-3/5 h-1/3 bg-white rounded-xl shadow-xl animate-fade-in flex flex-col justify-center items-center px-6 py-2 gap-4"
                                                >
                                                    <div className="text-start w-full">
                                                        <h4 className="text-bold text-brand-primary">Excluir vacina</h4>
                                                        <p className="text-sm text-medium text-zinc-600">Deseja excluir a vacina: {vaccine?.name}?</p>
                                                    </div>
                                                    <div className="flex gap-2 justify-end w-full">
                                                        <button
                                                            className="flex justify-center items-center min-w-[67px] px-2 py-1 text-red-600 font-medium rounded-md hover:bg-red-600 hover:text-white duration-300"
                                                            onClick={handleDelete}
                                                        >
                                                            {deleteMutation.isPending ? <LoaderCircle className="size-4 animate-spin" /> : 'Excluir'}
                                                        </button>
                                                        <button
                                                            className="px-2 py-1 bg-white text-brand-primary font-medium rounded-md hover:bg-brand-primary hover:text-white duration-300"
                                                            onClick={() => handleModal()}
                                                        >
                                                            Cancelar
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                    </div>}
                            </div>
                        ))}
                        </div>
                        : isLoading ? null : <p className="text-zinc-500 font-medium">Sem vacinas registradas sobre o {pet.name}</p>
                }
            </div>
        </div>
    )
}
