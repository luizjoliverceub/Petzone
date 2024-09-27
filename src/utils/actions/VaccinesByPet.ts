"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"

export async function getVaccines (petId: string){
    const session = await auth()

    const res = await fetch(`http://localhost:3000/api/vaccination/pet/${petId}`,{
      next:{
        tags:["vaccines"]
      },
      headers:{
           'session': JSON.stringify(session)
      }
    })

    const data = await res.json()
    
    return data
  }