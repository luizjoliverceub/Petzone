import { prisma } from '@/utils/db/prisma'
import { HeaderRoom } from '../components/HeaderRoom'
import MessageField from '@/app/user/(auth)/components/MessageField'
import Messages from '@/app/user/(auth)/components/Messages'

interface PageProps {
  params: {
    id: string
  }
}

const page = async ({ params }: PageProps) => {
  const { id } = params

  const existingMessages = await prisma.message.findMany({
    where: {
      conversationId: id,
    },
    orderBy: {
      createdAt: 'desc'
    },
  })

  const serializedMessages = existingMessages.map((message) => ({
    text: message.text,
    id: message.id,
    authorEmail: message.authorEmail,
    createdAt: message.createdAt
  }))

  return (
    <div className="w-full h-screen flex flex-col justify-between bg-gray-100">
      <HeaderRoom id={id} />
      <div className="flex flex-col flex-grow overflow-y-auto h-full">
        <div className="flex flex-col space-y-2 h-full">
          <MessageField roomId={id} initialMessages={serializedMessages} />
        </div>
      </div>

      <div className="border-t border-gray-300 bg-white">
        <Messages roomId={id} />
      </div>
    </div>
  )
}

export default page