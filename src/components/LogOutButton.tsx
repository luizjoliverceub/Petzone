import { LogOut } from "lucide-react"
import { useUser } from "../contexts/UserContext"

export function LogOutButton() {
    const { handleLogout } = useUser()

    return (
        <button
            className='flex w-full gap-2 bg-red-100 rounded-md font-semibold text-red-600 px-2 py-1 justify-center items-center text-sm hover:bg-red-600 hover:text-white duration-300'
            onClick={handleLogout}
        >
            <LogOut className="size-5" /> Desconectar
        </button>
    )
}