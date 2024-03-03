import { NextApiRequest } from "next";
import { auth } from "../../auth/[...nextauth]/route";
import { prisma } from "@/utils/db/prisma";
import { NextResponse } from "next/server";

export async function DELETE(req: NextApiRequest,{params}:{params:{id:string}}) {

    
    const session = await auth()

    const petId = params.id
  
        console.log(session);
        
    if(session){

   try {
      
    await prisma.pet.delete({
        where:{
            id: petId
        }
    })

     return new NextResponse(JSON.stringify({message:"Pet has been deleted!"}),{status:201})

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