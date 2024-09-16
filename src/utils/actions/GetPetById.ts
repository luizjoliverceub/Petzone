"use server"

import { Pet } from "@/app/(auth)/dashboard/page"
import { auth } from "@/app/api/auth/[...nextauth]/route"



export async function getPetById (petId:string){

    const session = await auth()

    const res = await fetch(`http://localhost:3000/api/pets/${petId}`,{
      next:{
        tags:["petById"]
      },
      headers:{
           'session': JSON.stringify(session)
      }
    })

     if (!res.ok) {
      throw new Error('Failed to fetch this pet data')
    }

   
    
    const data = await res.json() as Pet

    return data
  }