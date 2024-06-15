"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route";
import { revalidateTag } from "next/cache";
import { prisma } from "@/utils/db/prisma"; // Certifique-se de importar o Prisma Client corretamente

export async function sendMessages(message: string, conversationId: string, senderId: string) {
  const session = await auth();
  
  // Verificar se a conversa existe
  const conversationExists = await prisma.conversation.findUnique({
    where: {
      id: conversationId,
    },
  });

  if (!conversationExists) {
    throw new Error("Conversation not found");
  }

  // Enviar a mensagem se a conversa existir
  const resp = await fetch('http://localhost:3000/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, conversationId, senderId }),
    next: {
      tags: ["message"],
    },
  });

  revalidateTag("message");

  console.log("resp > " + resp);
  

  return resp;
}