"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"

export async function deleteService(id: string) {

    const session = await auth()

    await fetch(`http://localhost:3000/api/service/${id}`, {
        next: {
            tags: ["services"]
        },
        headers: {
            'session': JSON.stringify(session)
        },
        method: "DELETE"
    })
}