import { prisma } from "@/utils/db/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {


  const session = request.headers.get("session")


  const petId = params.id


  if (session) {

    try {

      await prisma.pet.delete({
        where: {
          id: petId
        }
      })

      return new NextResponse(JSON.stringify({ message: "Pet has been deleted!" }), { status: 201 })

    } catch (error) {
      console.log(error);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  } else {

    return new NextResponse(JSON.stringify({ message: "you are not authenticated" }),
      { status: 401 })
  }


}

export async function GET(request: Request, { params }: { params: { id: string } }) {

  const session = request.headers.get("session")
  const newSessionValue = JSON.parse(session || '')

  const petId = params.id
  
  
  try {
    const petById = await prisma.pet.findUnique({
      where: {
        id: petId
      },
      include:{
        user:{
          select:{
            name:true
          }
        }
      }
    })

    return new NextResponse(JSON.stringify(petById), { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 })
  }
}


export async function PUT(request: Request, { params }: { params: { id: string } }) {

  const session = request.headers.get("session")
  const newSessionValue = JSON.parse(session)



  const petId = params.id



  try {
    const body = await request.json();

    const petAlterInfo = await prisma.pet.update({
      where: {
        id: petId,
      },
      data: body,
    });

    return new NextResponse(JSON.stringify({ message: "Pet Alterado com sucesso!" }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
}
