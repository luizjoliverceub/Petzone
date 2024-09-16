import { NextResponse } from "next/server";
import { prisma } from "@/utils/db/prisma";
import { pusher } from "@/lib/pushServer";



export async function POST(request: Request) {

    const { conversationId, senderId, message } = await request.json();
    console.log("Route post message > " + conversationId + "senderId > " + senderId + "message > " + message);

    const newMessage = await prisma.message.create({
        data: { conversationId, senderId, message }
    });

    await pusher.trigger(`conversation-${conversationId}`, 'message_sent', {
        message: newMessage
    });



    return new NextResponse(JSON.stringify(newMessage), { status: 201 });


}