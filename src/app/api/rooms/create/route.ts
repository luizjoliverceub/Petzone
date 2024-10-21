import { prisma } from "@/utils/db/prisma";
import { NextResponse } from "next/server";

export async function POST(request:Request) {

  const session = request.headers.get("session")
  const newSessionValue = JSON.parse(session)
 
   
   // console.log(newSessionValue);
   
     if(session && newSessionValue ){
 
    try {
       
     const body = await request.json()
     console.log(body);
     
     const createdConversation = await prisma.conversation.create({
       data:{
        clientIdEmail:body.clientEmail,
        veterinarianEmail:body.veterinarianEmail
       }
         
       
     })
 
      return new NextResponse(JSON.stringify(createdConversation),{status:201})
 
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