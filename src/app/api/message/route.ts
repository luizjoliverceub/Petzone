import { pusherServer } from "@/lib/pushServer"
import { prisma } from "@/utils/db/prisma"



export async function POST(req: Request) {
  const { text, roomId,userEmail } = await req.json()

  pusherServer.trigger(roomId, 'incoming-message', text)

  await prisma.message.create({
    data: {
     text,
     conversationId:roomId,
     authorEmail:userEmail 
   
    },
  })

  return new Response(JSON.stringify({ success: true }))
}


