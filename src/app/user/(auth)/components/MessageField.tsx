'use client'

import { pusherClient } from '@/lib/pushServer'
import { useSession } from 'next-auth/react'
import { FC, useEffect, useState } from 'react'

interface MessagesProps {
  initialMessages: {
    text: string
    id: string
    authorEmail: string
    createdAt: Date
  }[]
  roomId: string
}

const MessageField: FC<MessagesProps> = ({ initialMessages, roomId }) => {
  const [incomingMessages, setIncomingMessages] = useState<string[]>([])
  const { data } = useSession()
  const emailSession = data?.user?.role === 'normal'

  useEffect(() => {
    pusherClient.subscribe(roomId)

    const handleMessage = (text: string) => {
      setIncomingMessages((prev) => {
        if (!prev.includes(text)) {
          return [text, ...prev]
        }
        return prev
      })
    }

    pusherClient.bind('incoming-message', handleMessage)

    return () => {
      pusherClient.unbind('incoming-message', handleMessage)
      pusherClient.unsubscribe(roomId)
    }
  }, [roomId])

  return (
    <div className="flex flex-col-reverse py-4 px-8 bg-gray-50 h-full overflow-y-auto overflow-x-hidden animate-fade-in pb-20">
      {incomingMessages.map((text, i) => (
        <p key={i} className={`self-end ${emailSession ? 'bg-blue-100 text-blue-900' : 'bg-vet-secondary/40 text-vet-primary'} p-2 rounded-lg mb-2 animate-fade-in text-wrap max-w-[450px] break-words font-medium`}>
          {text}
        </p>
      ))}
      {initialMessages.map((message) => (
        <p key={message.id} className={`${message.authorEmail === data?.user?.email ? emailSession ? 'self-end bg-blue-100 text-blue-900' : 'self-end bg-vet-secondary/40 text-vet-primary' : 'self-start bg-gray-200 text-gray-900'} font-medium py-2 px-3 rounded-lg mb-2 animate-fade-in text-wrap max-w-[450px] break-words`}>
          {message.text}
          {/* <span className='text-[10px] font-medium text-black/60'>
            {parseHour(message.createdAt)}
          </span> */}
        </p>
      ))}
    </div>
  )
}

export default MessageField