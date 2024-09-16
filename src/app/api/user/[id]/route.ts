import { prisma } from "@/utils/db/prisma";
import { NextResponse } from "next/server";
import { auth } from "../../auth/[...nextauth]/route";

export async function GET(request: Request, { params }: { params: { id: string } }) {
    const session = await auth()

    try {
        const user = await prisma.user.findFirst({
            where: {
                VeterinarianProfile: {
                    id: params.id
                }
            }
        })
        
        return new NextResponse(JSON.stringify(user), { status: 200 })

    } catch (error) {
        return NextResponse.json({ error: error }, { status: 500 })
    }
}