import { prisma } from "@/utils/db/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {

    const allVets = await prisma.veterinarianProfile.findMany({
      select: {
        crmv: true,
        cep: true,
        id: true,
        region: true,
        user: {
          select: {
            name: true,
            id: true
          }
        }
      }
    })

    return new NextResponse(JSON.stringify(allVets), { status: 201 })

  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
}