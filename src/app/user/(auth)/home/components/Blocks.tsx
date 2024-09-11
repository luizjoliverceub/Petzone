'use client'

import { Bone, MessageCircle, Activity } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { BlockInfo } from "./BlockInfo";
import { BlockNews } from "./BlockNew";
import { BlockEvents } from "./BlockEvents";

export function Blocks() {
    const { pets, appointments, news } = useUser()

    return (
        <div className="flex flex-col items-center 2xl:flex-row 2xl:items-start">
            <div>
                <div className="p-8 flex flex-col items-center gap-6 xl:flex-row">
                    <BlockInfo
                        title="Pets cadastrados"
                        Icon={Bone}
                        href="/user/pets"
                        value={pets.length}
                    />
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
            </div>
            <div className="p-8 flex-1 rounded-xl relative animate-fade-in">
                <BlockNews news={news} />
            </div>
        </div>
    )
}