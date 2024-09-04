import { Calendar } from "@/components/ui/calendar";

export function CalendarBlock() {
    return (
        <div className="border-2 p-8 rounded-xl flex flex-col justify-between h-[436px]">
            <h2 className="font-semibold text-zinc-700">Calendário</h2>
            <Calendar />
        </div>
    )
}