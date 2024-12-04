import { prisma } from "@/utils/db/prisma"
import { NextResponse } from "next/server"

export async function GET(request: Request) {

  const session = request.headers.get("session")
  const newSessionValue = session ? JSON.parse(session) : null

  console.log(session);
  

//   try {

    // const userEmail = newSessionValue.user.email

    // const Appointments = await prisma.appointments.findMany({
    //   where: {
    //     email: userEmail
    //   }
    // })

    return new NextResponse(JSON.stringify({teste:"message"}), { status: 200 })

//   } catch (error) {
//     console.log(error);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }),
//       { status: 500 }
//     );
//   }
}
