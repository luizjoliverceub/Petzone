import { auth } from "@/app/api/auth/[...nextauth]/route"

export async function getAllPets (){
    const session = await auth()
    const resp = await fetch("http://localhost:3000/api/pets",{
      headers:{
           'session': JSON.stringify(session)
      }
     })
    const data = await resp.json()
  
    return data
  }