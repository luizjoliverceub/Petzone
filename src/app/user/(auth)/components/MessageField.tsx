'use client'

import { pusherClient } from '@/lib/pushServer'
import { FC, useEffect, useState } from 'react'

interface MessagesProps {
  initialMessages: {
    text: string
    id: string
  }[]
  roomId: string
}

const Messages: FC<MessagesProps> = ({ initialMessages, roomId }) => {
  const [incomingMessages, setIncomingMessages] = useState<string[]>([])

  useEffect(() => {
    pusherClient.subscribe(roomId)
  
    const handleMessage = (text: string) => {
      setIncomingMessages((prev) => {
        if (!prev.includes(text)) { 
          return [...prev, text]
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
    <div className="flex flex-col-reverse p-4 bg-gray-50 h-[500px] overflow-y-auto">
      {incomingMessages.map((text, i) => (
        <p key={i} className="self-end bg-blue-100 text-blue-900 p-2 rounded-lg mb-2 max-w-xs">
          {text}
        </p>
      ))}
      {initialMessages.map((message) => (
        <p key={message.id} className="self-start bg-gray-200 text-gray-900 p-2 rounded-lg mb-2 max-w-xs">
          {message.text}
        </p>
      ))}
    </div>
  )
}

export default Messages