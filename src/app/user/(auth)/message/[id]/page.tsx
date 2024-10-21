import { prisma } from '@/utils/db/prisma'
import Messages from '../../components/MessageField'
import MessageField from '../../components/Messages'

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
  })

  const serializedMessages = existingMessages.map((message) => ({
    text: message.text,
    id: message.id,
  }))

  return (
    <div className="w-full h-screen flex flex-col justify-between bg-gray-100 ml-44 lg:ml-64">
      <div className="flex flex-col flex-grow p-4 overflow-y-auto">
        <div className="flex flex-col space-y-2">
          <Messages roomId={id} initialMessages={serializedMessages} />
        </div>
      </div>

      <div className="border-t border-gray-300 p-4 bg-white">
        <MessageField roomId={id} />
      </div>
    </div>
  )
}

export default page