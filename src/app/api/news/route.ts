import { prisma } from "@/utils/db/prisma"
import { NextResponse,NextRequest } from "next/server"
import { auth } from "../auth/[...nextauth]/route"



export async function GET(request:Request) {

  const session = await auth()

  
  

    return new NextResponse(JSON.stringify({message:"news",
text:"newsPage",
content:"contentNews"}),{status:200})

  }