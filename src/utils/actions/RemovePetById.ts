"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"
import { revalidateTag } from "next/cache"

export async function removePetById (petId:string){
   
    const session = await auth()
    
    const res =  await fetch(`http://localhost:3000/api/pets/${petId}`,{
        method:"DELETE",
        headers:{
            "session":  JSON.stringify(session)
        }
    })

    revalidateTag("/pets")

   

    
    
  }