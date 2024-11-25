import { Calendar } from "@/components/ui/calendar";
import { AppointmentType } from "@/models/Types";
import { parseDate } from "@/utils/actions/ParseDate";
import dayjs from "dayjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function BlockEvents({ events }: { events: AppointmentType[] | undefined }) {
    const eventsParsed = events?.filter(event => dayjs(event.appointment_date).isAfter(dayjs().month()))
    const dates = events?.map(event => dayjs(event.appointment_date).toDate()) || []

    return (
        <div className="flex gap-4 p-4 items-center rounded-xl shadow-custom2 hover:shadow-custom3 duration-300 group">
            <Calendar
                selected={dates}
                className="rounded-xl bg-white w-72 items-center justify-center flex"
            />
            <div className="h-64 bg-zinc-200 w-0.5 rounded-full" />
            <div className="h-72 w-full flex items-start flex-col px-4 py-2 ">
                <div className="w-full flex justify-between items-center text-zinc-500 group-hover:text-vet-secondary duration-300">
                    <h2 className="font-medium">Agenda de eventos</h2>
                    <ArrowRight className="size-5" />
                </div>
                <div className={`flex-1 h-full w-full flex ${eventsParsed?.length === 0 ? 'items-center justify-center' : ''}`}>
                    {eventsParsed?.length === 0 ?
                        <h2 className="font-medium text-zinc-700">Sem eventos registrado</h2> :
                        <div className="py-4 flex flex-col gap-1 w-full">
                            <div className="flex justify-between items-center px-2">
                                <h3 className="font-semibold opacity-50 text-sm">Serviço</h3>
                                <p className="font-semibold opacity-50 text-sm">Data</p>
                            </div>
                            {eventsParsed?.map(ev => (
                                <Link
                                    href={`/vet/myConsults/${ev.id}`}
                                    key={ev.id}
                                    className="flex flex-col justify-center w-full hover:bg-white hover:scale-105 px-2 py-1 rounded-lg duration-300">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold">{ev.service}</h3>
                                        <p className="font-semibold opacity-80 text-sm">{parseDate(ev.appointment_date)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}