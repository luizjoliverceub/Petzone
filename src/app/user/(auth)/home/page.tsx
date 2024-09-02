import { auth } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function Home() {
    const session = await auth()

    if (!session) {
        redirect("/user/login")
    }

    return (
        <main className="ml-64">
            Home
        </main>
    )
}