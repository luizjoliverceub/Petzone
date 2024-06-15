import { NextResponse } from "next/server";
import {pusher} from "../../../lib/pushServer"
import { prisma } from "@/utils/db/prisma";



export async function POST(request:Request) {
 
  const { conversationId, senderId, message } = await request.json();
    console.log("Route post message > " + conversationId + "senderId > " + senderId + "message > " + message);
    
  // Salva a mensagem no banco de dados
  const newMessage = await prisma.message.create({
    data: { conversationId, senderId, message }
  });

  // Dispara o evento do Pusher
  await pusher.trigger(`conversation-${conversationId}`, 'message_sent', {
    message: newMessage
  });

  

  return new NextResponse(JSON.stringify(newMessage), { status: 201 });
   

  }
  