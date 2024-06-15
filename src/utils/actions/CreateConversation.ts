"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route";

export async function createConversation({userId,vetId} : {userId:string,vetId:string}){
      

    const session = await auth()
    
      

      const resp = await fetch('http://localhost:3000/api/messages/conversation', {
      method: 'POST',
       headers: {
         'Content-Type': 'application/json',
      },
       body: JSON.stringify({ userId, vetId }) ,
     });

    


       return resp
        
        
      
      }