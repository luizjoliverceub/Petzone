import { auth } from "@/app/api/auth/[...nextauth]/route";
import AuthHeader from "@/components/Auth/AuthHeader";
import { getAllUsersConversations } from "@/utils/actions/GetAllUsersConversations";
import Link from "next/link";

export default async function MessagePage() {
  const session = await auth();
  const userId = session?.user?.id as string;

  console.log("session > " + JSON.stringify(session));

  const allConversation = await getAllUsersConversations(userId);

  console.log("all conver > " + JSON.stringify(allConversation));
  return (
    <main className="h-screen w-full">
      <AuthHeader titleText="Message" linkText="+ Adicionar Pet" link="/dashboard/create" />
      <div className="w-full h-[calc(100vh-5rem)] flex items-center justify-center flex-col gap-4 p-4">
        {allConversation.map((conversation) => (
          <Link key={conversation.id} href={`message/${conversation.id}`}>
            <div
              
              className="w-full max-w-lg p-4 bg-white shadow-md rounded-lg border border-gray-200 flex flex-col gap-2"
            >
              <h1 className="font-bold text-black">{conversation.vet.user.name}</h1>
              <p className="text-gray-700">CRMV ID: {conversation.vet.crmv}</p>
              <p className="text-gray-500">Region: {conversation.vet.region}</p>
              <p className="text-gray-400 text-sm">Conversa inciada em: {new Date(conversation.createdAt).toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}