'use client'

import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { NavMessage } from "./NavMessage";
import { ChangeEvent, useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { SkeletonNavVet } from "./SkeletonNavVet";
import { GetAllConversations } from "@/utils/actions/GetAllConversationsByUser";
import { parseDate } from "@/utils/actions/ParseDate";

export interface Conversation {
    createdAt: Date,
    started_at: Date,
    ended_at: Date,
    id: string,
    client: {
        name: string;
        email: string;
        id: string;
    };
    veterinarian: {
        email: string;
        name: string;
        VeterinarianProfile: {
            cep: string;
            crmv: string;
            region: string;
        };
    };
}

export function MessageNavBar() {
    const [search, setSearch] = useState('');
    const path = usePathname()
    const { data, error, isLoading } = useQuery({
        queryKey: ['conversations'],
        queryFn: async () => {
            const data: Conversation[] = await GetAllConversations()

            return data
        }
    })

    const [messages, setMessages] = useState<Conversation[]>([]);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.currentTarget.value);
    };

    useEffect(() => {
        if (Array.isArray(data) && path.includes('/user/message')) {
            const lowercasedSearch = search.toLowerCase();
            setMessages(data.filter(item =>
                item.client.email.toLowerCase().includes(lowercasedSearch) ||
                item.veterinarian.email.toLowerCase().includes(lowercasedSearch) ||
                item.veterinarian.name.toLowerCase().includes(lowercasedSearch) ||
                parseDate(item.createdAt).includes(lowercasedSearch)
            ));
        }
    }, [search, data, path]);

    if (error) return <div>Falha ao carregar dados: {error.message}</div>;

    return (
        <div className="h-full p-4 flex flex-col gap-2 min-w-80 shadow-md z-50 animate-fade-in">
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
                        <NavMessage data={messages} />

                }
            </div>
        </div>
    );
}
