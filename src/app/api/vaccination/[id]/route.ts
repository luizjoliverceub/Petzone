import { prisma } from "@/utils/db/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {

    const session = request.headers.get("session")
    const newSessionValue = JSON.parse(session)
   
     
     
       // if(session && newSessionValue ){
        const petId = params.id

      try {
         
       
       const allVaccinations = await prisma.vaccination.findMany({
        where:{
          petId:petId
        }
       })
   
       if(allVaccinations.length === 0) return new NextResponse(JSON.stringify({message:"Nenhuma vácina cadastrada para este pet ainda :)"}),{status:200})


        return new NextResponse(JSON.stringify(allVaccinations),{status:200})
   
      } catch (error) {
       console.log(error);
         return new NextResponse(
           JSON.stringify({ message: "Something went wrong!"}),
           { status: 500 }
         );
      }
   // }else{
      
   //     return new NextResponse(JSON.stringify({message:"you are not authenticated"}),
   //     {status:401})
   // }
       
     }
   

     export async function DELETE(request: Request, { params }: { params: { id: string } }) {

        const session = request.headers.get("session")
        const newSessionValue = JSON.parse(session)
       
         
         
           // if(session && newSessionValue ){
            const vaccinationId = params.id
    
          try {
             
           
           const allVaccinations = await prisma.vaccination.delete({
            where:{
                id:vaccinationId
            }
           })
       
    
    
            return new NextResponse(JSON.stringify({message:"Vacina deletada com sucesso!"}),{status:200})
       
          } catch (error) {
           console.log(error);
             return new NextResponse(
               JSON.stringify({ message: "Something went wrong!"}),
               { status: 500 }
             );
          }
       // }else{
          
       //     return new NextResponse(JSON.stringify({message:"you are not authenticated"}),
       //     {status:401})
       // }
           
         }
       
       
         
   
     