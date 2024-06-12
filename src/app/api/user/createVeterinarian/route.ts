import { prisma } from "@/utils/db/prisma"
import { NextResponse} from "next/server"



export async function POST(request:Request) {



   try {
     
    const body = await request.json()
   
    console.log(body);
    
    console.log("bateu" + body);
     const lerBody = JSON.stringify(body)

     console.log("lerBody" + lerBody);
    
     const { email, password, name, role, crmv,cep,region} = body;

    const createdUser = await prisma.user.create({
        data:{
         email:email,
         password:password,
         name:name,
         role:role
        }
    })

    if (role === 'veterinarian') {
      await prisma.veterinarianProfile.create({
        data: {
          crmv:crmv,
          cep:cep,
          userId: createdUser.id,
          region: region
        }
      });
    }

     return new NextResponse(JSON.stringify(createdUser),{status:201})

   } catch (error) {
    console.log(error);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!"}),
        { status: 500 }
      );
   }
   
    
  }