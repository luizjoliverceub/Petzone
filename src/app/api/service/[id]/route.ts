import { prisma } from "@/utils/db/prisma"
import { NextResponse } from "next/server"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {

    const session = request.headers.get("session")
    const newSessionValue = JSON.parse(session)
  
    const serviceId = params.id
  
    try {

      await prisma.service.delete({
        where: {
          id: serviceId
        }
      })

      return new NextResponse(JSON.stringify({ message: "Service deleted with success" }), { status: 200 })
    } catch (error) {
      console.log(error);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  }
  
//   export async function PUT(request: Request, { params }: { params: { id: string } }) {
  
//     const session = request.headers.get("session")
//     const newSessionValue = JSON.parse(session)
  
//     const AppointmentId = params.id
  
//     try {
//       const body = await request.json()
//       const AppointmentUpdated = await prisma.appointments.update({
//         data: body,
//         where: {
//           id: AppointmentId
//         }
//       })
  
//       return new NextResponse(JSON.stringify(AppointmentUpdated), { status: 200 })
  
//     } catch (error) {
  
//       console.log(error);
//       return new NextResponse(
//         JSON.stringify({ message: "Something went wrong!" }),
//         { status: 500 }
//       );
  
//     }
//   }
  
  export async function GET(request: Request, { params }: { params: { id: string } }) {
  
    const session = request.headers.get("session")
    const newSessionValue = JSON.parse(session)
  
    const ServiceId = params.id
  
    try {
      const Appointment = await prisma.service.findUnique({
        where: {
          id:  ServiceId
        }
      })
  
      return new NextResponse(JSON.stringify(Appointment), { status: 200 })
  
    } catch (error) {
  
      console.log(error);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  }