import { prisma } from "@/utils/db/prisma";
import { NextResponse } from "next/server";


export async function GET(request: Request, { params }: { params: { id: string } }) {
  const roomId = params.id
  
  try {
    const room = await prisma.conversation.findUnique({
      where: {
        id: roomId
      },
      select: {
        clientIdEmail: true,
        veterinarianEmail: true,
        id: true,
        createdAt: true,
        started_at: true,
        ended_at: true,
        client: {
          select: {
            name: true,
          }
        },
        veterinarian: {
          select: {
            name: true,
            id: true,
            VeterinarianProfile: {
              select: {
                crmv: true
              }
            }
          }
        }
      }
    })

    return new NextResponse(JSON.stringify(room), { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}