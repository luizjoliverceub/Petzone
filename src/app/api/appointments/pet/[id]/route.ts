import { prisma } from "@/utils/db/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  
    const pet = params.id
  
    try {
      const Appointment = await prisma.appointments.findMany({
        where: {
          petId: pet
        }
      })
  
      return new NextResponse(JSON.stringify(Appointment), { status: 200 })
  
    } catch (error) {
  
      console.log(error);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  }