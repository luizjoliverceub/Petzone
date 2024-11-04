import { prisma } from "@/utils/db/prisma"
import { NextResponse } from "next/server"

export async function PUT(request: Request, { params }: { params: { id: string } }) {

    const session = request.headers.get("session")
    const newSessionValue = JSON.parse(session)
  
    const AppointmentId = params.id

    const body = await request.json()
    try {
      
      const Appointment = await prisma.appointments.update({
        where: {
            id:AppointmentId
        },
        data:{
            status:body.status // "denied" //"confirmed"
        }
      })

      // if(body.status === "denied" || "canceled"){

      //  setTimeout(async () =>{
      //   await prisma.appointments.delete({
      //     where:{
      //       id:AppointmentId
      //     }
      //   })
      //  }, 1000 * 10)


      // }
      

      //  function funcaoLambda(){ 

      //     await queryAppointments()

      //     await queryDelete()
      //  }

      //  await funcaoLambda()

      return new NextResponse(JSON.stringify(Appointment), { status: 200 })
  
    } catch (error) {
  
      console.log(error);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  }