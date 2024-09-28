"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"


export async function addService (){
    const session = await auth()

    const res = await fetch("http://localhost:3000/api/service",{
      next:{
        tags:["service"]
      },
      headers:{
           'session': JSON.stringify(session)
      },
      method:"POST"
    })


    const data = await res.json()
    
    return data
  }