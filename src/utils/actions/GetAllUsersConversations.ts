"use server"


export async function getAllUsersConversations(userId:string){
      

      

      const data = await fetch(`http://localhost:3000/api/messages/conversation/${userId}`);
      const resp = await data.json()

      
       return resp
        
        
      
      }