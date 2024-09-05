import { prisma } from "@/utils/db/prisma";
import { NextResponse } from "next/server";


export async function GET(request: Request, { params }: { params: { id: string } }) {

   
  
    const vetId = params.id
  

      try {
        
        const vetById = await prisma.veterinarianProfile.findUnique({
          where: {
            id: vetId
          }
        })
  
        return new NextResponse(JSON.stringify(vetById), { status: 200 })


      } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
      }
  
  }



export async function DELETE(request: Request, { params }: { params: { id: string } }) {


 


  const vetId = params.id


    try {

      await prisma.veterinarianProfile.delete({
        where: {
          id: vetId
        }
      })

      return new NextResponse(JSON.stringify({ message: "vet has been deleted!" }), { status: 201 })

    } catch (error) {
      console.log(error);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  


}

