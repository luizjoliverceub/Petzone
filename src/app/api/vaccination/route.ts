import { prisma } from "@/utils/db/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {

   try {

      const body = await request.json()

      const createVaccination = await prisma.vaccination.create({
         data: {
            name: body.name,
            vaccination_date: new Date(body.vaccination_date),
            petId: body.petId
         }
      })

      return new NextResponse(JSON.stringify(createVaccination), { status: 201 })

   } catch (error) {
      console.log(error);
      return new NextResponse(
         JSON.stringify({ message: "Something went wrong!" }),
         { status: 500 }
      );
   }
}




