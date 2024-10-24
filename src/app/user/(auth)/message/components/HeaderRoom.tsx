'use client'
import { Room } from "@/utils/actions/GetRoomById"
import { parseDate, parseHour } from "@/utils/actions/ParseDate"
import { useQuery } from "@tanstack/react-query"
import { BadgeCheck } from "lucide-react"
import { useSession } from "next-auth/react"

export function HeaderRoom({ id }: { id: string }) {
    const { data: sessionData} = useSession()

    const { data, isLoading } = useQuery({
        queryKey: ['room', id],
        queryFn: async () => {
            const data: Room = await fetch(`http://localhost:3000/api/rooms/${id}`).then(res => res.json())
            return data
        }
    })

    const emailSession = sessionData?.user?.email === data?.clientIdEmail

    return (
        <div className="py-4 px-6 flex gap-2 z-40 border-b-2 bg-white animate-fade-in items-center">
            <div className={`h-16 w-16 bg-zinc-700 rounded-full ${isLoading ? 'animate-pulse' : ''}`} />
            <div className="flex flex-col justify-center">
                {isLoading ?

                    <div className="flex py-2 flex-col gap-1">
                        <div className="h-7 w-44 rounded-md animate-pulse bg-zinc-300" />
                        <div className="h-4 w-32 rounded-sm animate-pulse bg-zinc-300" />
                        <div className="h-4 w-32 rounded-sm animate-pulse bg-zinc-300" />
                    </div> :

                    <div className="flex flex-col justify-center">
                        <div className="flex gap-1">
                            <h3 className="font-medium text-lg">{emailSession ? data?.veterinarian.name : data?.client.name}</h3>
                            <div className={`${emailSession ? 'flex' : 'hidden'} gap-1 items-center group`}>
                                <BadgeCheck className="text-brand-secondary animate-fade-in size-5" />
                                <h3 className="hidden font-semibold group-hover:flex animate-fade-in gap-1 items-end text-xs">
                                    <span className="text-zinc-500 font-medium text-[10px]">CRMV:</span>
                                    {data?.veterinarian.VeterinarianProfile.crmv}
                                </h3>
                            </div>
                        </div>
                        <h3 className="text-xs font-semibold"><span className="text-zinc-500 font-medium text-xs">Iniciado:</span> {`${parseDate(data?.started_at)} às ${parseHour(data?.started_at)}`}</h3>
                        <h3 className="text-xs font-semibold"><span className="text-zinc-500 font-medium text-xs">Encerra:</span> {`${parseDate(data?.ended_at)} às ${parseHour(data?.ended_at)}`}</h3>
                    </div>}
            </div>
        </div>
    )
}