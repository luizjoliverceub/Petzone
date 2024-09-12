import { Pencil, Trash } from "lucide-react";

export function Options({ handleRemove, handleOpen }: { handleRemove: () => void, handleOpen: () => void }) {
    const handle = () => {
        handleRemove()
        handleOpen()
    }

    return (
        <div className="flex gap-1 absolute p-1 bg-zinc-50 animate-fade-in rounded-xl -top-10 -right-44 border-2 items-center justify-center">
            <button
                className="text-red-600 bg-red-100 rounded-md px-2 py-1 flex gap-1 items-center justify-center text-sm font-semibold hover:text-red-100 hover:bg-red-600 duration-300"
                onClick={handle}
            >
                <Trash className="size-4" />
                Excluir
            </button>
            <div className="h-5 w-0.5 rounded-xl bg-zinc-300" />
            <button
                className="text-brand-secondary bg-blue-100 rounded-md px-2 py-1 flex gap-1 items-center justify-center text-sm font-semibold hover:text-blue-100 hover:bg-brand-secondary duration-300"
            >
                <Pencil className="size-4" />
                Editar
            </button>
        </div>
    )
}