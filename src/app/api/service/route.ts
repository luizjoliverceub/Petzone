import { prisma } from "@/utils/db/prisma"
import { NextResponse } from "next/server"




export async function POST(request: Request) {

    const session = request.headers.get("session")
    const newSessionValue = JSON.parse(session)


   
    try {

      
 
  
      const userWithProfile = await prisma.user.findUnique({
         where: {
            email:newSessionValue.user.email
         },
         include: { VeterinarianProfile: {
            select:{
               id:true
            }
         }},
       });

       const VeterinarianProfileId = userWithProfile?.VeterinarianProfile?.id as string
   
      const service = await prisma.service.create({
         data:{
            name:"vet2Servico",
            price:220,
            veterinarianProfileId:VeterinarianProfileId
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


  export async function GET(request: Request) {

    const session = request.headers.get("session")
    const newSessionValue = JSON.parse(session)


  
    try {

   
 
      const userWithProfile = await prisma.user.findUnique({
         where: {
            email:newSessionValue.user.email
         },
         include: { VeterinarianProfile: {
            select:{
               id:true
            }
         }},
       });

       const VeterinarianProfileId = userWithProfile?.VeterinarianProfile?.id as string
  
      const allServices = await prisma.service.findMany({
       where:{
          veterinarianProfileId:VeterinarianProfileId
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




