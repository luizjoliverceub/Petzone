"use server"
import { auth } from "@/app/api/auth/[...nextauth]/route"

export interface Room {
    id: string;
    createdAt: Date;
    started_at: Date,
    ended_at: Date,
    clientIdEmail: string;
    veterinarianEmail: string;
    client: {
        name: string;
    };
    veterinarian: {
        name: string;
        id: string;
        VeterinarianProfile: {
            crmv: true
        }
    };
}

export async function GetRoomById({ id }: { id: string }) {
    const session = await auth()

    const res = await fetch(`http://localhost:3000/api/rooms/${id}`, {
        next: {
            tags: ["messages"]
        },
        headers: {
            'session': JSON.stringify(session)
        }
    })
    const data: Room = await res.json()

    return data
}