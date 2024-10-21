'use client'

import { createConversation } from '@/utils/actions/CreateConversation'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

const Page: FC = () => {
  const { data } = useSession()
  let roomIdInput = ''
  const router = useRouter()
  const userEmail = data?.user?.email

  const createRoom = async () => {
    const res = await createConversation({
      clientEmail: userEmail,
      veterinarianEmail: 'vet1@gmail.com',
      session: data,
    })

    const conversationId = res.id
    console.log(conversationId)

    router.push(`/user/message/${conversationId}`)
  }

  const joinRoom = async (roomId: string) => {
    router.push(`/user/message/${roomId}`)
  }

  return (
    <div className="w-full  flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">Chat Test</h1>
        <button
          onClick={createRoom}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors mb-4"
        >
          Create Room
        </button>
        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Enter room ID"
            onChange={({ target }) => (roomIdInput = target.value)}
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => joinRoom(roomIdInput)}
            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  )
}

export default Page