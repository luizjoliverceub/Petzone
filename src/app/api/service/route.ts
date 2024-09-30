import { prisma } from "@/utils/db/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {

   const session = request.headers.get("session")
   const newSessionValue = JSON.parse(session)

   const body = await request.json()

   try {
      const userWithProfile = await prisma.user.findUnique({
         where: {
            email: newSessionValue.user.email
         },
         include: {
            VeterinarianProfile: {
               select: {
                  id: true
               }
            }
         },
      });

      const VeterinarianProfileId = userWithProfile?.VeterinarianProfile?.id as string

      const service = await prisma.service.create({
         data: {
            name: body.name,
            price: parseFloat(body.price),
            veterinarianProfileId: VeterinarianProfileId
         }
      })

      return new NextResponse(JSON.stringify(service), { status: 201 });

   } catch (error) {
      console.log(error);
      return new NextResponse(
         JSON.stringify({ message: "Something went wrong!" }),
         { status: 500 }
      );
   }
}

export async function GET(request: Request, { params }: { params?: { id: string } }) {

   const session = request.headers.get("session")
   const newSessionValue = JSON.parse(session)

   let userWithProfile = undefined

   try {

      if (newSessionValue.user.role === 'veterinarian') {
         userWithProfile = await prisma.user.findUnique({
            where: {
               email: newSessionValue.user.email
            },
            include: {
               VeterinarianProfile: {
                  select: {
                     id: true
                  }
               }
            },
         });
      }

      const VeterinarianProfileId = userWithProfile?.VeterinarianProfile?.id as string

      const allServices = await prisma.service.findMany({
         where: {
            veterinarianProfileId: newSessionValue.user.role === 'veterinarian' ? VeterinarianProfileId : params?.id
         }
      })

      return new NextResponse(JSON.stringify(allServices), { status: 200 });

   } catch (error) {
      console.log(error);
      return new NextResponse(
         JSON.stringify({ message: "Something went wrong!" }),
         { status: 500 }
      );
   }
}