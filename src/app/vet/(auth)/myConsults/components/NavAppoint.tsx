import { AppointmentType } from "@/models/Types";
import { parseDate } from "@/utils/actions/ParseDate";
import { parseStatus, statusColor } from "@/utils/actions/parseStatus";
import Link from "next/link";

export function NavAppoint({ data }: { data?: AppointmentType[] | undefined }) {
    return (
        data ? data?.length === 0 ?
            <div className="flex justify-center">
                <h2 className="font-medium">Nenhuma consulta encontrada</h2>
            </div> :
            data?.map(appoint => (
                <Link href={`/vet/myConsults/${appoint.id}`} key={appoint.id}>
                    <div className="h-28 w-72 rounded-xl py-2 px-4 flex gap-3 items-center justify-center animate-fade-in border-2 hover:shadow-lg duration-300">
                        <div className="h-20 w-20 rounded-full bg-zinc-700" />
                        <div className="py-2 flex-1 flex flex-col justify-center text-nowrap truncate">
                            <h3 className="font-medium text-lg">{appoint.clientName}</h3>
                            <h3 className="font-medium text-sm text-zinc-500">Data: {parseDate(appoint.appointment_date)}</h3>
                            <h3 className="flex gap-1 items-center font-medium text-sm text-zinc-500">Status: {parseStatus(appoint.status)} <div className={`h-2.5 w-2.5 rounded-full bg-${statusColor(appoint.status)}`} /></h3>
                        </div>
                    </div>
                </Link>
            )) :
            <div className="flex justify-center">
                <h2 className="font-medium">Nenhuma consulta encontrada</h2>
            </div>
    )
}