import { prisma } from "@/utils/db/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    try {
        const resp = await prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
            }
        })
        return new NextResponse(JSON.stringify(resp), { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}