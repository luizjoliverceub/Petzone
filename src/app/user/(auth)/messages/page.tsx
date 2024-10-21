import { GetAllConversations } from "@/utils/actions/GetAllConversationsByUser"


export default async function MessagesPage() {

  const allConversations = await GetAllConversations()
  console.log(allConversations);
  
  return (
    <div>page
      {JSON.stringify(allConversations)}
    </div>
    
  )
}
