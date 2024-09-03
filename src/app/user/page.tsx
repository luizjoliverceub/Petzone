import { useUser } from "@/contexts/UserContext"
import { useRouter } from "next/navigation"

export default function Home() {
    const { session } = useUser()
    const router = useRouter()

    if (session?.user.role !== 'normal') {
        router.push('/welcome')
    }

    if (session?.user.role !== 'normal') {
        router.push('/user/home')
    }
}