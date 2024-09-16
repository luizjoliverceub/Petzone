'use client'

import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { NavVets } from "./NavVets";
import { SkeletonNavVet } from "./SkeletonNavVet";
import { AppointmentType, VeterinarianType } from "@/models/Types";
import { ChangeEvent, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NavAppoint } from "./NavAppoint";
import { useUser } from "@/contexts/UserContext";

export function ConsultNavbar() {
    const [search, setSearch] = useState('');
    const path = usePathname()
    const { appointments } = useUser()
    const { data, isLoading, error } = useQuery<VeterinarianType[]>({
        queryKey: ['vet-data'],
        queryFn: () =>
            fetch("/api/vets").then((res) =>
                res.json()
            )
    });


    const [vet, setVet] = useState<VeterinarianType[]>([]);
    const [appoint, setAppoint] = useState<AppointmentType[]>([]);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.currentTarget.value);
    };

    useEffect(() => {
        if (Array.isArray(data) && path.includes('/user/consults')) {
            const lowercasedSearch = search.toLowerCase();
            setVet(data.filter(item =>
                item.user.name.toLowerCase().includes(lowercasedSearch) ||
                item.crmv.toLowerCase().includes(lowercasedSearch) ||
                item.region.toLowerCase().includes(lowercasedSearch) ||
                item.cep.toLowerCase().includes(lowercasedSearch)
            ));
        }

        if (Array.isArray(appointments) && path.includes('/user/consults/allConsults')) {
            const lowercasedSearch = search.toLowerCase();
            setAppoint(appointments.filter(item =>
                item.appointment_date.toString().toLowerCase().includes(lowercasedSearch)
            ));
        }
    }, [search, data, path, appointments]);

    if (error) return <div>Falha ao carregar dados: {error.message}</div>;

    return (
        <div className="h-full p-4 flex flex-col gap-2 min-w-80">
            <div className="relative bg-transparent">
                <input
                    type="text"
                    placeholder="Pesquisar"
                    onChange={handleSearch}
                    className="w-72 pl-9 pr-4 py-2 rounded-lg border-2 outline-none shadow-lg fixed"
                />
                <Search className="absolute top-3.5 left-3.5 size-4 text-zinc-400" strokeWidth={3} />
            </div>
            <div className="mt-12 flex flex-col gap-4 overflow-y-auto py-2">
                {
                    isLoading ?
                        <SkeletonNavVet /> :
                        path.includes('/user/consults/allConsults') ?
                            <NavAppoint data={appoint} /> :
                            <NavVets data={vet} />
                }
            </div>
        </div>
    );
}
