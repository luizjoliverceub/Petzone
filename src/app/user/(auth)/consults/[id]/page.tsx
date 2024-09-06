'use client'

import { useParams } from "next/navigation";
import { useQuery } from '@tanstack/react-query';
import { VetUserType } from "@/models/Types";
import { FormCreateAppointment } from "./components/FormAppointment";

export default function Home() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, error } = useQuery<VetUserType>({
        queryKey: ['vet-data', id],
        queryFn: () =>
            fetch(`/api/vets/${id}`).then((res) =>
                res.json()
            ),
        enabled: !!id
    })

    if (error) return <div>Falha ao carregar dados</div>;
    if (isLoading) return <div className='h-screen flex-1 flex items-center justify-center py-4 pr-4'><div className='w-full h-full border-2 flex rounded-xl py-8 px-10 shadow-md animate-pulse' /></div>;

    return (
        <div className="h-screen flex-1 flex items-center justify-center py-4 pr-4">
            <div className="w-full h-full border-2 flex rounded-xl py-8 px-10 animate-fade-in shadow-md">
                <div className="h-60 w-60 rounded-full bg-zinc-800" />
                <div>
                    <h2>{data?.region}</h2>
                    <FormCreateAppointment vetId={id}/>
                </div>
                <div>
                </div>
            </div>
        </div>
    );
}
