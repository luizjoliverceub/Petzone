'use client'

import { Search } from "lucide-react";
import { AppointmentType } from "@/models/Types";
import { ChangeEvent, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { NavAppoint } from "./NavAppoint";
import { useQuery } from "@tanstack/react-query";
import { getAppointments } from "@/utils/actions/GetAppointments";
import { SkeletonNavVet } from "./SkeletonNavVet";

export function ConsultNavbar() {
    const [search, setSearch] = useState('');
    const path = usePathname()

    const { data, isLoading } = useQuery({
        queryKey: ['appoint'],
        queryFn: async () => {
            const data:AppointmentType[] = await getAppointments()

            return data
        }
    })

    const appointments = data || []

    const [appoint, setAppoint] = useState<AppointmentType[]>(appointments);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.currentTarget.value);
    };

    useEffect(() => {
        if (Array.isArray(appointments)) {
            const lowercasedSearch = search.toLowerCase();
            setAppoint(appointments.filter(item =>
                item.clientName.toString().toLowerCase().includes(lowercasedSearch) ||
                item.service.toString().toLowerCase().includes(lowercasedSearch) || 
                item.email.toString().toLowerCase().includes(lowercasedSearch)
            ));
        }
    }, [search, appointments, path]);

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
                    <NavAppoint data={appoint} />
                }
            </div>
        </div>
    );
}
