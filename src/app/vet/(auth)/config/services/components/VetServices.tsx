'use client'

import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { FormService, ServiceFormSchema } from "./FormService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllService } from "@/utils/actions/GetAllVetServices";
import { queryClient } from "@/hooks/useQuery";
import { toast } from "sonner";
import { deleteService } from "@/utils/actions/DeleteService";

export interface ServiceType extends ServiceFormSchema {
    id: string
}

export function VetServices() {
    const [open, setOpen] = useState(false)
    const [service, setService] = useState<ServiceType>()

    const handleOpen = () => {
        setOpen(!open)
    }

    const { data, isLoading } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const data: ServiceType[] = await getAllService()

            return data
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deleteService,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] })
            toast.success('Serviço excluido com sucesso!')
        },
        onError: (error) => {
            console.error("Erro ao deletar serviço:", error);
            alert("Erro ao deletar serviço");
        },
    });

    const handleDelete = (id: string) => {
        deleteMutation.mutate(id)
    }

    const formatted = (valor: any) => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor)

    return (
        <div className="h-2/3 w-2/3 border-2 p-8 rounded-xl flex flex-col gap-4 shadow-lg">
            <h2 className="font-semibold text-xl">Seus serviços</h2>
            <button
                type="button"
                onClick={handleOpen}
                className="flex gap-1 justify-center items-center w-full border-2 border-transparent bg-vet-secondary rounded-md py-1.5 font-semibold text-white hover:bg-transparent hover:text-vet-primary hover:border-vet-secondary duration-300"
            >
                Adicionar serviço <Plus className="size-5" />
            </button>

            {open && <FormService handle={handleOpen} />}

            <div className="flex flex-col gap-2 overflow-y-auto">
                {
                    isLoading ?
                        <>
                            <div className="w-full h-11 bg-zinc-300 rounded-md animate-pulse" />
                            <div className="w-full h-11 bg-zinc-300 rounded-md animate-pulse" />
                            <div className="w-full h-11 bg-zinc-300 rounded-md animate-pulse" />
                            <div className="w-full h-11 bg-zinc-300 rounded-md animate-pulse" />
                            <div className="w-full h-11 bg-zinc-300 rounded-md animate-pulse" />
                        </> :
                        data?.map(service => (
                            <div
                                key={service.name}
                                className="w-full border-2 rounded-md px-4 py-2 flex justify-between"
                            >
                                <h3 className="font-medium">{service.name}</h3>
                                <div className="min-w-48 flex justify-between">
                                    <h3 className="flex gap-1 font-medium">{formatted(service.price)}</h3>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => handleDelete(service.id)}
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
                                    </div>
                                </div>

                            </div>
                        ))
                }
            </div>
        </div>
    )
}