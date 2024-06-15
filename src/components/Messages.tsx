'use client'

import { useSession } from 'next-auth/react';
import Pusher from 'pusher-js';
const pusher = new Pusher("b34fe7139c47c18d7a11", {
    cluster: "us2",
  });
  
import { FC, useEffect, useState } from 'react'

interface MessagesProps {
  initialMessages: {
    id: string;
    conversationId: string;
    senderId: string;
    message: string;
    createdAt: Date;
  }  []
  roomId: string
}

const Messages: FC<MessagesProps> = ({ initialMessages, roomId }) => {
  const [incomingMessages, setIncomingMessages] = useState<string[]>([])

  const { data: session } = useSession();

  const currentUserId = session?.user?.id

  useEffect(() => {
    pusher.subscribe(roomId)


    pusher.bind('incoming-message', (text: string) => {
      setIncomingMessages((prev) => [...prev, text])
    })

    
    return () => {
      pusher.unsubscribe(roomId)
    }
  }, [])

  console.log("messages info " + JSON.stringify(initialMessages));
  

  return (
    <div className="flex flex-col p-4 max-w-xl mx-auto bg-gray-100 rounded-lg">
      {initialMessages.map((message) => (
        <p key={message.id} className={`px-4 py-2 my-2 rounded-2xl max-w-xs break-words ${currentUserId === message.senderId ? "self-end bg-brand-secondary text-white" : "self-start bg-white border border-gray-300 text-black"}`}>{message.message}</p>
      ))}
      {incomingMessages.map((text, i) => (
        <p key={i} className="px-4 py-2 my-2 rounded-2xl max-w-xs break-words self-start bg-white border border-gray-300 text-black">{text}</p>
      ))}
    </div>
  )
}

export default Messages