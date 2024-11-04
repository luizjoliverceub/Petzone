import Link from "next/link";
import { Conversation } from "./MessageNavBar";
import { parseDate, tempDate } from "@/utils/actions/ParseDate";
import { useSession } from "next-auth/react";

export function NavMessage({ data }: { data?: Conversation[] | undefined }) {
    const { data: sessionData} = useSession()

    const emailSession = sessionData?.user?.role === 'normal'

    return (
        data ? data?.length === 0 ?
            <div className="flex justify-center">
                <h2 className="font-medium">Nenhum bate-papo encontrado</h2>
            </div> :
            data?.map(message => (
                <Link href={`/user/message/${message.id}`} key={message.id}>
                    <div className="h-28 w-72 rounded-xl py-2 px-4 flex gap-3 items-center justify-center animate-fade-in border-2 hover:shadow-lg duration-300">
                        <div className="h-20 w-20 rounded-full bg-zinc-700" />
                        <div className="py-2 flex-1 flex flex-col justify-center">
                            <h3 className="font-medium text-lg">{emailSession? `Dr. ${message.veterinarian.name}`: message.client.name}</h3>
                            <h3 className="font-medium text-sm text-zinc-500">Iniciado: {`${parseDate(message.started_at)}`}</h3>
                            <h3 className="font-medium text-sm text-zinc-500">{tempDate(message.ended_at)}</h3>
                        </div>
                    </div>
                </Link>
            )) :
            <div className="flex justify-center">
                <h2 className="font-medium">Nenhum bate-papo encontrado</h2>
            </div>
    )
}