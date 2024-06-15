import { prisma } from "@/utils/db/prisma";
import { NextResponse } from "next/server";


export async function POST(request:Request) {
    
  const { userId, vetId } = await request.json();
  
  console.log("Bateu aqui conversation Post");
  
  // Verifica se já existe uma conversa entre o usuário e o veterinário
  const conversation = await prisma.conversation.findFirst({
    where: { userId, vetId }
  });

  if (conversation) {
    return new NextResponse(JSON.stringify(conversation), { status: 200 });
  }

  console.log("UserId > " + userId + " vetId > " + vetId);
  
  // Cria uma nova conversa
  const newConversation = await prisma.conversation.create({
    data: { userId, vetId }
  });

  return new NextResponse(JSON.stringify(newConversation), { status: 201 });
}

