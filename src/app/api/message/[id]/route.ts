import { prisma } from "@/utils/db/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const id = params.id

    if (typeof id !== 'string') {
        return new NextResponse(JSON.stringify({ message: "Invalid room id!" }), { status: 400 })
    }

    try {
        const messages = await prisma.message.findMany({
            where: {
                conversationId: id,
            },
            orderBy: {
                createdAt: 'asc',
            },
        })

        return new NextResponse(JSON.stringify(messages), { status: 200 });
    } catch (error) {
        console.error('Failed to fetch messages:', error)
        return new NextResponse(JSON.stringify({ message: "Failed to fetched messages" }), { status: 500 })
    }
}
