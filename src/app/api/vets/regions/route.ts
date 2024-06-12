import { prisma } from "@/utils/db/prisma"
import { NextResponse} from "next/server"



export async function GET(request:Request) {



   try {
    
    const allRegions = await prisma.veterinarianProfile.findMany({
      select:{
        region:true
      }
    })


     return new NextResponse(JSON.stringify(allRegions),{status:201})

   } catch (error) {
    console.log(error);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!"}),
        { status: 500 }
      );
   }
   
    
  }