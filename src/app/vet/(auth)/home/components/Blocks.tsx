'use client'

import { Bone, MessageCircle, Activity } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { BlockInfo } from "./BlockInfo";
import { BlockNews } from "./BlockNew";
import { BlockEvents } from "./BlockEvents";
import { BlockEmpty } from "./BlockEmpty";

export function Blocks() {
    const { pets, appointments, news } = useUser()

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
                <BlockNews news={news} />
                <BlockEmpty />
            </div>
        </div>
    )
}