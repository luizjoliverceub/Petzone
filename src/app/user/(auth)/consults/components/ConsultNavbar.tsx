'use client'

import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { NavVets } from "./NavVets";
import { SkeletonNavVet } from "./SkeletonNavVet";
import { VeterinarianType } from "@/models/Types";
import { ChangeEvent, useState, useEffect } from "react";

export function ConsultNavbar() {
    const [search, setSearch] = useState('');
    const { data, isLoading, error } = useQuery<VeterinarianType[]>({
        queryKey: ['vet-data'],
        queryFn: () =>
            fetch("/api/vets").then((res) =>
                res.json()
            )
    });

    const [vet, setVet] = useState<VeterinarianType[]>([]);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.currentTarget.value);
    };

    useEffect(() => {
        if (data) {
            const lowercasedSearch = search.toLowerCase();
            setVet(data.filter(item =>
                item.user.name.toLowerCase().includes(lowercasedSearch) ||
                item.crmv.toLowerCase().includes(lowercasedSearch) ||
                item.region.toLowerCase().includes(lowercasedSearch) ||
                item.cep.toLowerCase().includes(lowercasedSearch)
            ));
        }
    }, [search, data]);

    if (error) return <div>Falha ao carregar dados: {error.message}</div>;

    return (
        <div className="h-full p-4 flex flex-col gap-4">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Pesquisar"
                    onChange={handleSearch}
                    className="w-72 pl-9 pr-4 py-2 rounded-lg border-2 outline-none shadow-lg"
                />
                <Search className="absolute top-3.5 left-3.5 size-4 text-zinc-400" strokeWidth={3} />
            </div>
            {isLoading ? <SkeletonNavVet /> : <NavVets data={vet} />}
        </div>
    );
}
