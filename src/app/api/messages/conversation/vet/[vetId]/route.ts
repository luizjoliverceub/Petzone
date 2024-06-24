import { prisma } from "@/utils/db/prisma";
import { NextResponse } from "next/server";

export async function GET(request:Request,{params}:{params:{vetId:string}}) {


    const vetId = params.vetId
   
    console.log("vet Id "+ vetId);
    
    try {
        
        const allConversations = await prisma.conversation.findMany({
             where:{
                vetId:vetId
             },
             include:{
              user:{
                select:{
                  name:true,
                  email:true,
                  
                }
              }
             }
        })
        //selecionar também o nome do veterinário
        
          return new NextResponse(JSON.stringify(allConversations), { status: 201 });

    } catch (error) {
        console.log("db get conversation Erro " + error);

        return NextResponse.json({error:error},{status:500})
    }

  
    
  
  }