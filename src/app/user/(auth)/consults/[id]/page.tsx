'use client'

import { useParams } from "next/navigation";
import { useQuery } from '@tanstack/react-query';
import { VetUserType } from "@/models/Types";
import { FormCreateAppointment } from "./components/FormAppointment";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function Home() {
    const [open, setOpen] = useState(false)
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useQuery<VetUserType>({
        queryKey: ['vet-data', id],
        queryFn: () =>
            fetch(`/api/vets/${id}`).then((res) =>
                res.json()
            ),
        enabled: !!id
    })

    const handleOpen = () => {
        setOpen(!open)
    }

    if (error) return <div>Falha ao carregar dados</div>;
    if (isLoading) return <div className='h-screen flex-1 flex items-center justify-center py-4 pr-4'><div className='w-full h-full border-2 flex rounded-xl py-8 px-10 shadow-md animate-pulse' /></div>;

    return (
        <div className="h-screen flex-1 flex items-center justify-center py-4 pr-4">
            <div className="w-full h-full border-2 flex flex-col rounded-xl p-4 animate-fade-in shadow-md">
                <Link
                    href={'/user/consults'}
                    className="text-zinc-500 hover:text-brand-secondary duration-300 flex gap-2"
                >
                    <ArrowLeft />
                    <span className="font-medium">Voltar</span>
                </Link>
                <div className="flex p-8">
                    <div className="h-60 w-60 rounded-full bg-zinc-800" />
                    <h2>{data?.region}</h2>
                    <div className="flex flex-col items-center justify-center">
                        <button
                            type="button"
                            className="px-4 py-2 border-2 rounded-xl border-transparent bg-brand-secondary text-white font-semibold hover:bg-transparent hover:text-brand-secondary hover:border-brand-secondary duration-300"
                            onClick={handleOpen}
                        >
                            Realizar agendamento
                        </button>
                        {open && <FormCreateAppointment vetId={id} handle={handleOpen} />}
                    </div>
                </div>
            </div>
        </div>
    );
}
