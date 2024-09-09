import { prisma } from "@/utils/db/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const session = request.headers.get("session")
  const newSessionValue = JSON.parse(session || '')

  if (session && newSessionValue) {
    try {
      const resp = await prisma.pet.findMany({
        where: {
          userEmail: newSessionValue.user.email
        }
      })

      return new NextResponse(JSON.stringify(resp), { status: 200 })
    } catch (error) {
      return NextResponse.json({ error: error }, { status: 500 })
    }

  } else {
    return new NextResponse(JSON.stringify({ message: "you are not authenticated" }),
      { status: 401 })
  }
}