"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"


export async function GetAllConversations(){
    const session = await auth()

    const res = await fetch("http://localhost:3000/api/rooms",{
      next:{
        tags:["messages"]
      },
      headers:{
           'session': JSON.stringify(session)
      }
    })


    const data = await res.json()
    
    return data
  }