"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"

export async function getAppointmentPet(id: string) {
    const session = await auth()

    const res = await fetch(`http://localhost:3000/api/appointments/pet/${id}`,{
      next:{
        tags:["appoint"]
      },
      headers:{
           'session': JSON.stringify(session)
      }
    })

    const data = await res.json()
    
    return data
  }