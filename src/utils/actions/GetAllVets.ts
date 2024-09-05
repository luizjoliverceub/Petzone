"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"

export async function getAllVets (){
    const session = await auth()

    const res = await fetch("http://localhost:3000/api/vets",{
      next:{
        tags:["vets"]
      },
      headers:{
           'session': JSON.stringify(session)
      }
    })

    const data = await res.json()
    
    return data
  }