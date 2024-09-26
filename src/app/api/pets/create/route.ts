import { prisma } from "@/utils/db/prisma"
import { NextResponse} from "next/server"



export async function POST(request:Request) {

 const session = request.headers.get("session")
 const newSessionValue = JSON.parse(session)

  
  // console.log(newSessionValue);
  
    if(session && newSessionValue ){

   try {
      
    const body = await request.json()
    console.log(body);
    
    const createdPet = await prisma.pet.create({
      data: {
        id: body.id,
        name: body.name,
        age: body.age,
        city: body.city,
        birthDate: body.birthDate,
        race: body.race,
        notes: body.notes,
        sex: body.sex,
        user: {
          connect: { email: body.userEmail }, 
        },
      },
        
      
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