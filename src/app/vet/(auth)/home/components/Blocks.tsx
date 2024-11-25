'use client'

import { Bone, MessageCircle, Activity } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { BlockInfo } from "./BlockInfo";
import { BlockNews } from "./BlockNew";
import { BlockEvents } from "./BlockEvents";
import { BlockEmpty } from "./BlockEmpty";
import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "@/utils/actions/GetAllNews";
import { AppointmentType } from "@/models/Types";
import { getAppointments } from "@/utils/actions/GetAppointments";
import { GetAllConversations } from "@/utils/actions/GetAllConversationsByUser";

export function Blocks() {
    const { data, isLoading } = useQuery({
        queryKey: ['news'],
        queryFn: async () => {
            const data = await getAllNews()

            return data
        }
    })

    const { data:rooms } = useQuery({
        queryKey: ['rooms'],
        queryFn: async () => {
            const data = await GetAllConversations()

            return data
        }
    })

    console.log(rooms)

    const appointData = useQuery({
        queryKey: ['appoint'],
        queryFn: async () => {
            const data: AppointmentType[] = await getAppointments()

            return data
        }
    })
    
    return (
        <div className="flex flex-col items-center 2xl:flex-row 2xl:items-start">
            <div>
                <div className="p-8 flex flex-col items-center gap-6 xl:flex-row">
                    <BlockInfo
                        title="Bate-papos"
                        Icon={MessageCircle}
                        href="/vet/message"
                        value={rooms?.length}
                        isLoading={isLoading}
                    />
                    <BlockInfo
                        title="Consultas agendadas"
                        Icon={Activity}
                        href="/vet/myConsults"
                        value={appointData.data?.length}
                        isLoading={isLoading}
                    />
                </div>
                <div className="px-8">
                    <BlockEvents events={appointData.data}/>
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