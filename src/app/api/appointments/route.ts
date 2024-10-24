import { prisma } from "@/utils/db/prisma"
import dayjs from "dayjs";
import { NextResponse } from "next/server"

export async function POST(request: Request) {

  const session = request.headers.get("session")
  const newSessionValue = session ? JSON.parse(session) : null

  console.log("Bateu appointments POST");

  try {

    const body = await request.json()

    const createAppointment = await prisma.appointments.create({
      data: {
        appointment_date: dayjs(body.appointment_date).toDate(),
        email: body.email,
        clientName: body.clientName,
        petId: body.petId,
        phone: body.phone,
        service: body.service,
        userId: body.userId,
        veterinarianProfileId: body.veterinarianProfileId,
        started_at: dayjs(body.started_at).toDate(),
        ended_at: dayjs(body.ended_at).toDate()
      },
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

type userRole = "normal" | "veterinarian"

export async function GET(request: Request) {

  const session = request.headers.get("session")
  const newSessionValue = session ? JSON.parse(session) : null
  const userRole = newSessionValue?.user?.role as userRole
  const userEmail = newSessionValue.user.email

  console.log("Bateu appointments GET" + userRole);

  try {

    if (userRole === "normal") {


      const Appointments = await prisma.appointments.findMany({
        where: {
          email: userEmail,
        }
      })

      return new NextResponse(JSON.stringify(Appointments), { status: 200 })
    }

    if (userRole === "veterinarian") {
      const Appointments = await prisma.appointments.findMany({
        where: {
          veterinarian: {
            user: {
              email: userEmail,
            }
          }
        }
      })

      return new NextResponse(JSON.stringify(Appointments), { status: 200 })
    }

  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
}
