'use client'

import { useQuery } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";

export function VetServices() {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(!open)
    }

    const servicesData = useQuery<{ service: string }[]>({
        queryKey: ['services-data'],
        queryFn: () =>
            fetch(`/api/vets/services`).then((res) =>
                res.json()
            ),
    })

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

            {open && <form className="flex justify-between items-center border-2 rounded-md animate-fade-in">
                <select
                    className='px-4 py-2.5 outline-none bg-white'
                    id='service'
                    defaultValue=""
                >
                    <option
                        value=""
                        disabled
                    >
                        Selecione um serviço
                    </option>

                    {servicesData.data?.map(service => (
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
                        <label htmlFor="cost" className="text-zinc-500">R$</label>
                        <input type="text" id="cost" className="outline-none w-16" placeholder="00,00" />
                    </div>
                    <div className="bg-zinc-300 w-0.5 h-6 rounded-xl" />
                    <button className="font-semibold text-zinc-400 hover:text-vet-primary duration-300">
                        Adicionar
                    </button>
                </div>
            </form>}
        </div>
    )
}