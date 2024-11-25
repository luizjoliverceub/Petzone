'use client'

import { Bone, MessageCircle, Activity } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { BlockInfo } from "./BlockInfo";
import { BlockNews } from "./BlockNew";
import { BlockEvents } from "./BlockEvents";
import { BlockEmpty } from "./BlockEmpty";
import { useQuery } from "@tanstack/react-query";
import { getAllNews } from "@/utils/actions/GetAllNews";
import { GetAllConversations } from "@/utils/actions/GetAllConversationsByUser";
import { Conversation } from "../../message/components/MessageNavBar";

export function Blocks() {
    const { pets, appointments } = useUser()

    const { data, isLoading } = useQuery({
        queryKey: ['news'],
        queryFn: async () => {
            const data = await getAllNews()

            return data
        }
    })

    const messagesData = useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            const data: Conversation[] = await GetAllConversations()

            return data
        }
    })

    return (
        <div className="flex flex-col items-center 2xl:flex-row 2xl:items-start">
            <div className="w-full">
                <div className="w-full p-8 flex flex-col items-center gap-6 xl:flex-row">
                    <BlockInfo
                        title="Pets cadastrados"
                        Icon={Bone}
                        href="/user/pets"
                        value={pets.length}
                    />
                    <BlockInfo
                        title="Conversas"
                        Icon={MessageCircle}
                        href="/user/message"
                        value={messagesData.data?.length}
                    />
                    <BlockInfo
                        title="Consultas agendadas"
                        Icon={Activity}
                        href="/user/consults"
                        value={appointments.length}
                    />
                </div>
                <div className="px-8">
                    <BlockEvents events={appointments}/>
                </div>
                <div className="px-8 hidden 2xl:flex">
                    <BlockEmpty horizontal />
                </div>
            </div>
            <div className="p-8 flex-1 rounded-xl relative animate-fade-in flex 2xl:flex-col gap-10 w-full h-full">
                {isLoading ? <div className="w-[610px] h-[406px] rounded-xl bg-zinc-300 animate-pulse" /> : <BlockNews news={data} />}
                <BlockEmpty />
            </div>
        </div>
    )
}