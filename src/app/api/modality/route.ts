import { prisma } from "@/utils/db/prisma";
import { NextResponse } from "next/server";


export async function PUT(request: Request) {

    const session = request.headers.get("session")
  const newSessionValue = JSON.parse(session) 

  

  const userEmail = newSessionValue.user.email as string
  const body = await request.json();
  console.log("body " + body);


    try {
      
      const userByEmail = await prisma.user.findUnique({
        where:{
            email:userEmail
        }
      })

      const userAlterInfo = await prisma.veterinarianProfile.update({
        where:{
            userId:userByEmail?.id
        },
        data:body,
        
        
      });
  
      return new NextResponse(JSON.stringify(userAlterInfo), { status: 200 });
    } catch (error) {
      console.log(error);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  }
