"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"
import { revalidateTag } from "next/cache";

export async function AlterStatus(dataForm: {status: string}, id: string){

    const session = await auth()

     await fetch(`http://localhost:3000/api/appointments/status/${id}`,{
       next:{
         tags:["user"]
       },
       headers:{
            'session': JSON.stringify(session)
       },
       method:"PUT",
       body:JSON.stringify(dataForm)
     })


     revalidateTag('appoint-data')
  }