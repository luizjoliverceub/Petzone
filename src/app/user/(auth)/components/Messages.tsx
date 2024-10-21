'use client'

import { useSession } from 'next-auth/react'
import { FC } from 'react'

interface MessageFieldProps {
  roomId: string
}

const MessageField: FC<MessageFieldProps> = ({ roomId }) => {
  let input = ''

  const { data } = useSession()
  const userEmail = data?.user?.email

  const sendMessage = async (text: string) => {
    await fetch('/api/message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, roomId, userEmail }),
    })
  }

  return (
    <div className="flex items-center gap-3 p-3 border-t border-gray-300 bg-gray-100">
      <input
        onChange={({ target }) => (input = target.value)}
        className="flex-1 rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        type="text"
        placeholder="Type a new message..."
      />
      <button
        onClick={() => sendMessage(input || '')}
        className="bg-blue-500 text-white rounded-full px-4 py-2 hover:bg-blue-600 transition-colors"
      >
        Send
      </button>
    </div>
  )
}

export default MessageField