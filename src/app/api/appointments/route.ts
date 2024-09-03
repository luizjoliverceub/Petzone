import { prisma } from "@/utils/db/prisma"
import { NextResponse } from "next/server"

export async function POST(request: Request) {

  const session = request.headers.get("session")
  const newSessionValue = JSON.parse(session)

  console.log("Bateu appointments POST");

  try {

    const body = await request.json()

    const createAppointment = await prisma.appointments.create({
      data: body,
    })

    return new NextResponse(JSON.stringify(createAppointment), { status: 201 })

  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {

  const session = request.headers.get("session")
  const newSessionValue = JSON.parse(session)


  console.log("Bateu appointments GET");


  try {

    const userEmail = newSessionValue.user.email


    const Appointments = await prisma.appointments.findMany({
      where: {
        email: userEmail
      }
    })

    return new NextResponse(JSON.stringify(Appointments), { status: 200 })

  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }



}
