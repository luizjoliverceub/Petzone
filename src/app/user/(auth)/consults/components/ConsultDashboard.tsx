'use client'

import useSWR from 'swr';
import { getAllVets } from "@/utils/actions/GetAllVets";
import { Search } from "lucide-react";
import Link from "next/link";

export type VeterinarianType = {
    crmv: string;
    cep: string;
    id: string;
    region: string;
    user: {
        name: string;
        id: string;
    };
};

const fetcher = async () => {
    const data = await getAllVets();
    return data;
};

export function ConsultDashboard() {
    const { data: vets, error } = useSWR<VeterinarianType[]>('/api/vets', fetcher);

    if (error) return <div>Falha ao carregar dados</div>;
    if (!vets) return <div className='h-full p-4 flex flex-col gap-4'>
        <div className="relative">
            <input
                type="text"
                placeholder="Pesquisar"
                className="w-72 pl-9 pr-4 py-2 rounded-lg border-2 outline-none shadow-lg"
            />
            <Search className="absolute top-3.5 left-3.5 size-4 text-zinc-400" strokeWidth={3} />
        </div>
        <div className="h-28 w-72 rounded-xl py-2 px-4 animate-pulse bg-zinc-200" />
        <div className="h-28 w-72 rounded-xl py-2 px-4 animate-pulse bg-zinc-200" />
        <div className="h-28 w-72 rounded-xl py-2 px-4 animate-pulse bg-zinc-200" />
        <div className="h-28 w-72 rounded-xl py-2 px-4 animate-pulse bg-zinc-200" />
        <div className="h-28 w-72 rounded-xl py-2 px-4 animate-pulse bg-zinc-200" />
        <div className="h-28 w-72 rounded-xl py-2 px-4 animate-pulse bg-zinc-200" />
        <div className="h-28 w-72 rounded-xl py-2 px-4 animate-pulse bg-zinc-200" />
    </div>;


    return (
        <div className="h-full p-4 flex flex-col gap-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Pesquisar"
                    className="w-72 pl-9 pr-4 py-2 rounded-lg border-2 outline-none shadow-lg"
                />
                <Search className="absolute top-3.5 left-3.5 size-4 text-zinc-400" strokeWidth={3} />
            </div>
            {
                vets.length === 0 ?
                    <div>Nenhum veterinário encontrado.</div> :
                    vets.map(vet => (
                        <Link href={`/user/consults/${vet.id}`} key={vet.id}>
                            <div className="h-28 w-72 rounded-xl py-2 px-4 flex gap-3 items-center justify-center border-2 animate-fade-in hover:shadow-md duration-200">
                                <div className="h-20 w-20 rounded-full bg-zinc-700" />
                                <div className="py-2 flex-1 flex flex-col justify-center">
                                    <h3 className="font-medium text-lg">Dr. {vet.user.name}</h3>
                                    <h3 className="font-medium text-sm text-zinc-500">Clinica: {vet.region}</h3>
                                    <h3 className="font-medium text-sm text-zinc-500">CRMV: {vet.crmv}</h3>
                                </div>
                            </div>
                        </Link>
                    ))
            }
        </div>
    );
}
