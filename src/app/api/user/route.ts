import { prisma } from "@/utils/db/prisma"
import { NextResponse } from "next/server"

export async function GET(request:Request) {


  const session = request.headers.get("session")
  const newSessionValue = JSON.parse(session) 

 
  const userEmail = newSessionValue.user.email as string
    try {
      
 let userInfo 

     if(newSessionValue.user.role as string  === "veterinarian"){
       userInfo = await prisma.user.findUnique({
         where:{
             email:userEmail as string,
         },
         select:{
           name:true,
           email:true,
           emailVerified:true,
           role:true,
           password:true,
          VeterinarianProfile:{
            select:{
              modality:true
            }
          }
         },
         
        
     })

     }else{
      
      userInfo = await prisma.user.findUnique({
        where:{
            email:userEmail as string,
        },
        select:{
          name:true,
          email:true,
          emailVerified:true,
          role:true,
          password:true,
          
        }
    })

     }
     

     console.log("Atual " + userInfo);
     

      return new NextResponse(JSON.stringify(userInfo),{status:201})

    } catch (error) {
     console.log(error);
       return new NextResponse(
         JSON.stringify({ message: "Something went wrong!"}),
         { status: 500 }
       );
    }
   
    
  }



  

  export async function PUT(request: Request) {

    const session = request.headers.get("session")
  const newSessionValue = JSON.parse(session) 

  

  const userEmail = newSessionValue.user.email as string
  const body = await request.json();
  console.log("body " + body);


    try {
      
      
      const userAlterInfo = await prisma.user.update({
        where: {
          email: userEmail,
        },
        data: body,
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

   export async function DELETE(request: Request) {

 const session = request.headers.get("session")
   const newSessionValue = JSON.parse(session) 

   console.log(newSessionValue);

   const userEmail = newSessionValue.user.email as string

     try {
    
  
       await prisma.user.delete({
         where:{
           email:userEmail
         }
       })
  
       return new NextResponse(JSON.stringify({message:"Usuário excluido com sucesso"}), { status: 200 });

     } catch (error) {

       console.log(error);
       return new NextResponse(
         JSON.stringify({ message: "Something went wrong!" }),
         { status: 500 }
       );
     }
   }