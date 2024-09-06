"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"




export async function DeleteUserInfo(){

    const session = await auth()

    

     await fetch("http://localhost:3000/api/user",{
       next:{
         tags:["user"]
       },
       headers:{
            'session': JSON.stringify(session)
       },
       method:"DELETE"
     })


     //revalidateTag('user')
    
  }