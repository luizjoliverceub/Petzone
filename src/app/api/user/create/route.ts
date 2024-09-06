import { prisma } from "@/utils/db/prisma"
import { NextResponse } from "next/server"



export async function POST(request: Request) {



  try {

    const body = await request.json()

    console.log(body);

    console.log("bateu" + body);
    const lerBody = JSON.stringify(body)

    console.log("lerBody" + lerBody);


    const createdUser = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        name: body.name,
        role: body.role
      }
    })

    return new NextResponse(JSON.stringify(createdUser), { status: 201 })

  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }


}