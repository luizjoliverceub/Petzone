import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod"
import { addService } from "@/utils/actions/AddService";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { queryClient } from "@/hooks/useQuery";

const ServiceSchema = z.object({
    name: z.string().min(1, "Selecione um serviço"),
    price: z.string().min(1, "Preço inválido").transform((value) => value.replace(',', '.')),
})

export type ServiceFormSchema = z.infer<typeof ServiceSchema>

export function FormService({ handle }: { handle: () => void }) {
    const serviceOptions = useQuery<{ service: string }[]>({
        queryKey: ['services-data'],
        queryFn: () =>
            fetch(`/api/vets/services`).then((res) =>
                res.json()
            ),
    })

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<ServiceFormSchema>({
        resolver: zodResolver(ServiceSchema)
    })

    const addServiceMutation = useMutation({
        mutationFn: addService,
        onSuccess: () => {
            toast.success('Service adicionado com sucesso!');
            queryClient.invalidateQueries({ queryKey: ['services'] })
            handle()
            reset()
        },
        onError: () => {
            toast.error('Erro em adicionar servico');
        }
    });

    async function onSubmit(data: ServiceFormSchema) {
        addServiceMutation.mutate(data);
        console.log(data)
    }

    return (
        <form
            className="flex justify-between items-center border-2 rounded-md animate-fade-in"
            onSubmit={handleSubmit(onSubmit)}
        >

            <select
                className='px-4 py-2.5 outline-none bg-white'
                id='name'
                defaultValue=""
                {...register("name", { required: true })}
            >
                <option
                    value=""
                    disabled
                >
                    Selecione um serviço
                </option>

                {serviceOptions.data?.map(service => (
                    <option
                        value={service.service}
                        key={service.service}
                        className="font-medium"
                    >
                        {service.service}
                    </option>
                ))}
            </select>

            <div className="flex gap-4 px-4">
                <div className="flex gap-1">
                    <label
                        htmlFor="price"
                        className="text-zinc-500"
                    >
                        R$
                    </label>
                    <input
                        type="text"
                        id="price"
                        className="outline-none w-16"
                        placeholder="00,00"
                        {...register("price", { required: true })} />
                </div>

                <div className="bg-zinc-300 w-0.5 h-6 rounded-xl" />
                <button
                    type="submit"
                    disabled={addServiceMutation.isPending || isSubmitting}
                    className="flex justify-center items-center min-w-20 font-semibold text-zinc-400 hover:text-vet-primary duration-300"
                >
                    {
                        addServiceMutation.isPending || isSubmitting ?
                            <LoaderCircle className="size-4 text-vet-primary animate-spin" strokeWidth={3} /> :
                            'Adicionar'
                    }
                </button>
            </div>
        </form>
    )
}