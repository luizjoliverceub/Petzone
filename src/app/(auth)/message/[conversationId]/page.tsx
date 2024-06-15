import AuthHeader from "@/components/Auth/AuthHeader";
import MessageField from "@/components/MessageField";
import Messages from "@/components/Messages";
import { prisma } from "@/utils/db/prisma";




export default async function ConversationPage({ params }: { params: { conversationId: string } }) {
const conversationIdChat = params.conversationId



  
    const existingMessages = await prisma.message.findMany({
      where: {
       conversationId: conversationIdChat
      },
    })
   
 

  return (
    <main className="h-screen w-full">
      <AuthHeader titleText="Message" linkText="+ Add Pet" link="/dashboard/create" />
      <div className="p-4">
       <Messages initialMessages={existingMessages}  roomId={conversationIdChat}/>
       <MessageField conversationId={conversationIdChat}/>
      </div>
    </main>
  );
}