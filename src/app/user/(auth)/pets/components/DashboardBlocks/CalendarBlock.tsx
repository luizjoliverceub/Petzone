import { Calendar } from "@/components/ui/calendar";

export function CalendarBlock() {
    return (
        <div className="border-2 pt-8 px-8 pb-4 rounded-xl flex flex-col justify-between h-full gap-4">
            <h2 className="font-semibold text-zinc-700">Calendário</h2>
            <Calendar />
        </div>
    )
}