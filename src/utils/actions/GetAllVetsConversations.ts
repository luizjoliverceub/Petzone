"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route";


export async function getAllVetsConversations(vetId:string){
      

      const session = await auth()

      const data = await fetch(`http://localhost:3000/api/messages/conversation/vet/${vetId}`,
           
      );
      
      const resp = await data.json()

      
       return resp
        
        
      
      }