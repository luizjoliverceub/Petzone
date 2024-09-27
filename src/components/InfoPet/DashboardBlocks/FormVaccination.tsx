'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query"; // Import do useMutation
import { createVaccination } from "@/utils/actions/CreateVaccination";
import { queryClient } from "@/hooks/useQuery";

const VaccinationSchema = z.object({
    name: z.string().min(2, "Nome inválido"),
    vaccination_date: z.string().min(10, 'Data inválida').max(11),
    petId: z.string().min(1, "ID do pet inválido"),
});

type VaccinationType = z.infer<typeof VaccinationSchema>;

export function FormVaccination({ petId, handleOpen }: { petId: string, handleOpen: () => void }) {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, isValid },
        reset,
    } = useForm<VaccinationType>({
        resolver: zodResolver(VaccinationSchema),
    });

    // Mapeamento da mutação usando useMutation
    const mutation = useMutation({
        mutationFn: createVaccination,
        onSuccess: () => {
            toast.success("Vacinação criada com sucesso!");
            queryClient.invalidateQueries({ queryKey: ['vaccines', petId] })
            handleOpen();
            reset();
        },
        onError: (error) => {
            console.error("Error creating vaccination:", error);
            toast.error("Erro ao criar vacinação");
        },

    });

    const onSubmit = (data: VaccinationType) => {
        mutation.mutate(data);  // Disparando a mutação com os dados do formulário
    };

    return (
        <form
            className="bg-white flex gap-4 border-2 px-2 py-1 rounded-md items-center absolute -bottom-12 animate-fade-in"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
        >
            <input
                className="outline-none font-medium w-36"
                id="name"
                placeholder="Nome da vacina"
                {...register("name", { required: true })}
            />

            <input
                className="outline-none"
                type="date"
                id="vaccination_date"
                {...register("vaccination_date", { required: true })}
            />

            <input
                className="hidden"
                id="petId"
                value={petId}
                {...register("petId", { required: true })}
            />

            <button
                type="submit"
                disabled={isSubmitting || !isValid}
                className={`w-20 flex justify-center font-medium duration-300 ${isValid ? 'text-brand-secondary' : 'text-zinc-500 cursor-default'}`}
            >
                {isSubmitting ? <LoaderCircle className="size-4 animate-spin text-brand-secondary" /> : "Registrar"}
            </button>
        </form>
    );
}
