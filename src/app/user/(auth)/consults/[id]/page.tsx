'use client'

import useSWR from 'swr';
import { getVetById } from "@/utils/actions/GetVetById";
import { useParams } from "next/navigation";

type VetType = {
    id: string;
    userId: string;
    crmv: string;
    region: string;
    cep: string;
    addressId: null;
};

const fetchVet = async (id: string) => {
    return await getVetById({ id });
};

export default function Home() {
    const { id } = useParams<{ id: string }>();

    const { data: vet, error } = useSWR(id ? `/api/vets/${id}` : null, () => fetchVet(id));

    if (error) return <div>Falha ao carregar dados</div>;
    if (!vet) return <div className='h-screen flex-1 flex items-center justify-center py-4 pr-4'><div className='w-full h-full border-2 flex rounded-xl py-8 px-10 shadow-md animate-pulse' /></div>;

    return (
        <div className="h-screen flex-1 flex items-center justify-center py-4 pr-4">
            <div className="w-full h-full border-2 flex rounded-xl py-8 px-10 animate-fade-in shadow-md">
                <div className="h-60 w-60 rounded-full bg-zinc-800" />
                <div>
                    <h2>{vet.region}</h2>
                </div>
            </div>
        </div>
    );
}
