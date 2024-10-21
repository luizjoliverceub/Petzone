import { createConversation } from "../actions/CreateConversation"

export const createRoom = async ({userEmail,data,veterinarianEmail = "vet1@gmail.coom"}:{userEmail:string,data:any,veterinarianEmail:string }) => {
    const res = await createConversation({
      clientEmail: userEmail,
      veterinarianEmail: veterinarianEmail,
      session: data,
    })

    const conversationId = res.id
    console.log(conversationId)

  }

