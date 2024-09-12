import { Calendar } from "@/components/ui/calendar";
import { ArrowRight } from "lucide-react";

export function BlockEvents() {
    return (
        <div className="flex gap-4 p-4 items-center rounded-xl shadow-custom2 hover:shadow-custom3 duration-300 group">
            <Calendar
                className="rounded-xl bg-white w-72 items-center justify-center flex"
            />
            <div className="h-64 bg-zinc-200 w-0.5 rounded-full" />
            <div className="h-72 w-full flex items-start flex-col px-4 py-2 ">
                <div className="w-full flex justify-between items-center text-zinc-500 group-hover:text-vet-secondary duration-300">
                    <h2 className="font-medium">Agenda de eventos</h2>
                    <ArrowRight className="size-5" />
                </div>
                <div className="h-full w-full flex items-center justify-center">
                    <h2 className="font-medium text-zinc-700">Sem eventos registrado</h2>
                </div>
            </div>
        </div>
    )
}