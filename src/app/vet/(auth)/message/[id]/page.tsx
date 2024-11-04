import { prisma } from '@/utils/db/prisma'
import { HeaderRoom } from '../components/HeaderRoom'
import { Room } from '@/utils/actions/GetRoomById'
import { parseDate, parseHour } from '@/utils/actions/ParseDate'
import dayjs from 'dayjs'
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

  const room = await prisma.conversation.findUnique({
    where: {
      id: id,
    },
    select: {
      started_at: true,
      ended_at: true
    }
  })

  if(!room) throw new Error("Essa sala não existe")
  
  const serializedMessages = existingMessages.map((message) => ({
    text: message.text,
    id: message.id,
    authorEmail: message.authorEmail,
    createdAt: message.createdAt
  }))

  const disabledChat = dayjs(room?.started_at).isAfter(dayjs()) || dayjs(room?.ended_at).isBefore(dayjs())

  const hourChat = () => {
    if (!room || !room.started_at || !room.ended_at) {
      return (
        <h3 className='font-bold text-lg'>Informações de chat indisponíveis</h3>
      );
    }

    if (dayjs(room?.started_at).isAfter(dayjs()) && dayjs(room?.started_at).isSame(dayjs(), 'day')) {
      return (
        <>
          <h3 className='text-sm'>Disponível às</h3>
          <span className='text-brand-secondary font-bold text-4xl'>{parseHour(room?.started_at)}</span>
        </>
      )
    }

    if (dayjs(room?.started_at).isAfter(dayjs()) && !dayjs(room?.started_at).isSame(dayjs(), 'day')) {
      return (
        <>
          <h3 className='text-sm'>Disponível em</h3>
          <span className='text-brand-secondary font-bold text-4xl'>{parseDate(room?.started_at)}</span>
        </>
      )
    }

    if (dayjs(room?.ended_at).isBefore(dayjs()) && dayjs(room?.ended_at).isSame(dayjs(), 'day')) {
      return (
        <>
          <h3 className='text-sm'>Encerrado às</h3>
          <span className='text-brand-secondary font-bold text-4xl'>{parseHour(room?.ended_at)}</span>
        </>
      )
    }

    if (dayjs(room?.ended_at).isBefore(dayjs()) && !dayjs(room?.ended_at).isSame(dayjs(), 'day')) {
      return (
        <>
          <h3 className='text-sm'>Encerrado em</h3>
          <span className='text-brand-secondary font-bold text-4xl'>{parseDate(room?.ended_at)}</span>
        </>
      )
    }

    return (
      <h3 className='font-bold text-lg'>Chat não disponível no momento</h3>
    );
  }

  return (
    <div className="w-full h-screen flex flex-col justify-between bg-gray-100 relative">
      <HeaderRoom id={id} />
      <div className="flex flex-col flex-grow overflow-y-auto h-full">
        <div className="flex flex-col space-y-2 h-full">
          <MessageField roomId={id} initialMessages={serializedMessages} />
        </div>
      </div>

      <div className="border-t border-gray-300 bg-white">
        <Messages roomId={id} room={room || {} as Room} />
      </div>

      {disabledChat && <div className='bg-black/30 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center gap-2 h-full w-full z-10 animate-fade-in'>
        <div className='bg-white text-black flex flex-col justify-center items-center rounded-xl shadow-lg gap-2 p-10'>
          <h3 className='text-xl font-semibold'>Chat indisponível</h3>
          <div className='flex flex-col justify-center items-center'>
            {hourChat()}
          </div>
        </div>
      </div>}
    </div>
  )
}

export default page