import { Plus } from "lucide-react";

export function BlockEmpty({ horizontal }: { horizontal?: boolean }) {
    return (
        horizontal ?
            <div className="mt-8 h-[260px] w-full shadow-custom2 rounded-xl flex items-center justify-center text-zinc-500 hover:text-brand-secondary hover:shadow-custom3 duration-300">
                <Plus className="border rounded-full p-1 size-9 shadow-custom2" />
            </div> :
            <div className="h-[340px] w-full shadow-custom2 rounded-xl flex items-center justify-center text-zinc-500 hover:text-brand-secondary hover:shadow-custom3 duration-300">
                <Plus className="border rounded-full p-1 size-9 shadow-custom2" />
            </div>
    )
}