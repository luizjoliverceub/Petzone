import { prisma } from "@/utils/db/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params?: { id: string } }) {

  const session = request.headers.get("session")
  const newSessionValue = JSON.parse(session || '')

  try {

    const modality = await prisma.veterinarianProfile.findUnique({
      where: {
        id: params?.id
      }, select: {
        modality: true
      }
    })

    return new NextResponse(JSON.stringify(modality), { status: 200 });

  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
}

