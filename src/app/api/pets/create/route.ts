import { prisma } from "@/utils/db/prisma"
import { NextResponse,NextRequest } from "next/server"
import { auth } from "../../auth/[...nextauth]/route"


export async function POST(request:Request) {

  const session = await auth()

  
  
    if(session){

   try {
      
    const body = await request.json()
    
    const createdPet = await prisma.pet.create({
        data:body,
       
    })

     return new NextResponse(JSON.stringify(createdPet),{status:201})

   } catch (error) {
    console.log(error);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!"}),
        { status: 500 }
      );
   }
}else{
   
    return new NextResponse(JSON.stringify({message:"you are not authenticated"}),
    {status:401})
}
    
  }