"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"

export async function deleteConversationById(id: string) {

    const session = await auth()

    await fetch(`http://localhost:3000/api/rooms/${id}`, {
        next: {
            tags: ["conversation"]
        },
        headers: {
            'session': JSON.stringify(session)
        },
        method: "DELETE"
    })
}