import { prisma } from "@/utils/db/prisma";
import { NextResponse } from "next/server";

export async function GET(request:Request) {


    const session = request.headers.get("session")
    const newSessionValue = JSON.parse(session) 
  
    console.log(newSessionValue);
  
    const userEmail = newSessionValue.user.email as string
      try {
      
        const allCoversations = await prisma.conversation.findMany({
            where:{
                clientIdEmail:userEmail
            },
            include:{
              veterinarian:{
                select:{
                  email:true,
                  name:true,
                  VeterinarianProfile:{
                    select:{
                      cep:true,
                      crmv:true,
                      region:true,
                    }
                  }
                }
              }
            }
        })
  
        
        return new NextResponse(JSON.stringify(allCoversations),{status:200})
  
      } catch (error) {
       console.log(error);
         return new NextResponse(
           JSON.stringify({ message: "Something went wrong!"}),
           { status: 500 }
         );
      }
     
      
    }
  
  