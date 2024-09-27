"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"

export async function deleteVaccine(id: string) {

    const session = await auth()

    await fetch(`http://localhost:3000/api/vaccination/${id}`, {
        next: {
            tags: ["vaccine"]
        },
        headers: {
            'session': JSON.stringify(session)
        },
        method: "DELETE"
    })
}