'use client'

import { Bone, MessageCircle, Activity } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { BlockInfo } from "./BlockInfo";
import { BlockNews } from "./BlockNew";
import { BlockEvents } from "./BlockEvents";
import { BlockEmpty } from "./BlockEmpty";
import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "@/utils/actions/GetAllNews";

export function Blocks() {
    const { pets, appointments, news } = useUser()

    const { data, isLoading } = useQuery({
        queryKey: ['news'],
        queryFn: async () => {
            const data = await getAllNews()

            return data
        }
    })


    return (
        <div className="flex flex-col items-center 2xl:flex-row 2xl:items-start">
            <div>
                <div className="p-8 flex flex-col items-center gap-6 xl:flex-row">
                    <BlockInfo
                        title="Mensagens"
                        Icon={MessageCircle}
                        href="/user/message"
                        value={3}
                    />
                    <BlockInfo
                        title="Consultas agendadas"
                        Icon={Activity}
                        href="/user/consults"
                        value={appointments.length}
                    />
                </div>
                <div className="px-8">
                    <BlockEvents />
                </div>
                <div className="px-8">
                    <BlockEmpty horizontal />
                </div>
            </div>
            <div className="p-8 flex-1 rounded-xl relative animate-fade-in flex flex-col gap-10">
            {isLoading ? <div className="w-[610px] h-[406px] rounded-xl bg-zinc-300 animate-pulse" /> : <BlockNews news={data} />}
                <BlockEmpty />
            </div>
        </div>
    )
}