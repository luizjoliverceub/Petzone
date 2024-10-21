"use server"



export async function createConversation(data:any){
    
    
  const resp = await fetch("http://localhost:3000/api/rooms/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "session": JSON.stringify(data.session),
    },
    body: JSON.stringify(data),
  });

const dataresp = resp.json()

 return dataresp
}
