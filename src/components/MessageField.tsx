'use client'

import { sendMessages } from '@/utils/actions/SendMessage'
import { useSession } from 'next-auth/react'
import { FC, useState } from 'react'

interface MessageFieldProps {
  conversationId: string
}

const MessageField: FC<MessageFieldProps> = ({ conversationId }) => {
  const { data: session } = useSession();
  const senderId = session?.user?.id as string;
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
      console.log("Sending message:", JSON.stringify({ conversationId, message, senderId }));
      await sendMessages(message, conversationId, senderId);
      setMessage(''); // Clear message input on successful send
  }

  return (
    <div className='flex items-center gap-2 p-4 bg-white border-t border-gray-200'>
      <input
        value={message}
        onChange={({ target }) => setMessage(target.value)}
        className='flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
        type='text'
        placeholder='Type a message...'
      />
      <button
        onClick={sendMessage}
        className='px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
      >
        Send
      </button>
    </div>
  );
}

export default MessageField;