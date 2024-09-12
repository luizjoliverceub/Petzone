import { LogOut, Settings } from "lucide-react"
import { useUser } from "../contexts/UserContext"
import Link from "next/link"

export function UserOptionBtn({ signOut }: { signOut?: boolean }) {
    const { handleLogout } = useUser()

    return (
        signOut ?
            <button
                className='flex w-full gap-2 bg-red-100 rounded-md font-semibold text-red-600 px-2 py-2 justify-center items-center text-sm hover:bg-red-600 hover:text-white duration-300'
                onClick={handleLogout}
            >
                <LogOut className="size-5" /> Desconectar
            </button> :
            <Link
                href={'/user/config'}
                className='flex w-full gap-2 bg-gray-300 rounded-md font-semibold text-zinc-900 px-2 py-2 justify-center items-center text-sm hover:bg-zinc-600 hover:text-white duration-300'
            >
                <Settings className="size-5" /> Configurações
            </Link>
    )
}