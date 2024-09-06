"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"
import { revalidateTag } from "next/cache";
import { z } from "zod"


const  alterUser = z.object({
    name: z.string().min(1,"Nome é obrigatório"),
    email: z.string().email('Email inválido'),
    
});

export type AlterUser = z.infer<typeof alterUser>;

export async function AlterUserInfo(dataForm:AlterUser){

    const session = await auth()

    console.log(dataForm, "session > " + session);
    

     await fetch("http://localhost:3000/api/user",{
       next:{
         tags:["user"]
       },
       headers:{
            'session': JSON.stringify(session)
       },
       method:"PUT",
       body:JSON.stringify(dataForm)
     })


     revalidateTag('user')

  }