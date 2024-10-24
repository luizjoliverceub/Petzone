'use client'

import dayjs from 'dayjs'
import { Send } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { FC, useState } from 'react'

interface MessageFieldProps {
  roomId: string
  room: {
    ended_at: Date,
    started_at: Date
  }
}

const Messages: FC<MessageFieldProps> = ({ roomId, room }) => {
  let input = ''

  const { data } = useSession()
  const userEmail = data?.user?.email
  const emailSession = data?.user?.role === 'normal'

  const sendMessage = async (text: string) => {
    await fetch('/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, roomId, userEmail }),
    })
  }

  const handleSend = () => {
    sendMessage(input || '')
  }

  const disabledChat = dayjs(room.started_at).isAfter(dayjs()) || dayjs(room.ended_at).isBefore(dayjs())

  return (
    <div className="flex items-center gap-3 p-4 border-t border-gray-300 bg-gray-100 animate-fade-in z-40 absolute bottom-0 w-full">
      <input
        onChange={({ target }) => input = target.value}
        className={`flex-1 rounded-full px-6 py-2 border border-gray-300 outline-none ${disabledChat ? 'cursor-not-allowed bg-zinc-300 placeholder-zinc-500' : ''} duration-300`}
        type="text"
        placeholder="Mensagem..."
        disabled={disabledChat}
      />
      <button
        onClick={handleSend}
        className={`flex items-center justify-center gap-2 ${emailSession ? 'bg-blue-500 hover:bg-blue-600' : 'bg-vet-primary hover:bg-vet-third' } text-white rounded-full py-2 px-4 transition-colors ${disabledChat ? 'bg-zinc-600 hover:bg-zinc-600 cursor-not-allowed' : ''} duration-300`}
      >
        <Send className='size-4' />
        Enviar
      </button>
    </div>
  )
}

export default Messages