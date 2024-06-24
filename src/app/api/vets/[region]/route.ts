import { prisma } from "@/utils/db/prisma"
import { NextResponse} from "next/server"



export async function GET(request:Request,{params}:{params:{region:string}}) {

  const regionToFindAllVets = params.region

   try {
    
    const allVetsByRegions = await prisma.veterinarianProfile.findMany({
      where:{
        region:regionToFindAllVets
      },
      include:{
        user:{
          select:{
            name:true,
            
          }
        }
      }
    })

    

    // if(allVetsByRegions.length <= 0){
    //   console.log("bateu aqui");
      
    //   return new NextResponse(
    //     JSON.stringify({ message: "This region do not have vets yet"}),
    //     { status: 500 }
    //   );
    // }
  
    
     return new NextResponse(JSON.stringify(allVetsByRegions),{status:200})

   } catch (error) {
    console.log(error);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!"}),
        { status: 500 }
      );
   }
   
    
  }

  