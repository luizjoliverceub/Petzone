import { prisma } from "@/utils/db/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const session = request.headers.get("session")
  const newSessionValue = JSON.parse(session || '')
  const userRole = newSessionValue?.user?.role as userRole

  try {

    if (userRole === 'normal') {
      const resp = await prisma.pet.findMany({
        where: {
          userEmail: newSessionValue.user.email
        },
        include: {
          user: {
            select: {
              name: true
            }
          },
          vaccination: {
            select: {
              id: true,
              name: true,
              petId: true,
              vaccination_date: true
            }
          }
        }
      })

      return new NextResponse(JSON.stringify(resp), { status: 200 })
    }

    if (userRole === 'veterinarian') {
      const resp = await prisma.pet.findMany({
        select: {
          name: true,
          id: true
        }
      })

      return new NextResponse(JSON.stringify(resp), { status: 200 })
    }
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}

type userRole = "normal" | "veterinarian"