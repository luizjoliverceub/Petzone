"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"
import { revalidateTag } from "next/cache"


export async function GetUserInfo(){
    const session = await auth()

    const res = await fetch("http://localhost:3000/api/user",{
      next:{
        tags:["user"]
      },
      headers:{
           'session': JSON.stringify(session)
      }
    })


   

    const data = await res.json()
    
    return data

    
  }