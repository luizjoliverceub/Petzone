"use server"

import { Pet } from "@/app/(auth)/dashboard/page"
import { auth } from "@/app/api/auth/[...nextauth]/route"



export async function getFirstPet (){
    const session = await auth()

    const res = await fetch("http://localhost:3000/api/pets",{
      next:{
        tags:["pets"]
      },
      headers:{
           'session': JSON.stringify(session)
      }
    })

     if (!res.ok) {
      throw new Error('Failed to fetch pets data')
    }

    const data = await res.json() as Pet[]

    const firstPet = data.filter((pet,i) => {
        return i === 0
    })
    
   
    
    return firstPet
  }