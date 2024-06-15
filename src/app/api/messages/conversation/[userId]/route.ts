import { prisma } from "@/utils/db/prisma";
import { NextResponse } from "next/server";

export async function GET(request:Request,{params}:{params:{userId:string}}) {


    const userId = params.userId




    try {
        
        const allConversations = await prisma.conversation.findMany({
             where:{
                userId:userId
             },
            include:{
                vet:{
                    select:{
                        crmv:true,
                        region:true,
                        user:{
                            select:{
                                name:true
                            }
                        }
                    
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