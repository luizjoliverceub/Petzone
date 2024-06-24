import { auth } from '@/app/api/auth/[...nextauth]/route'
import AuthHeader from '@/components/Auth/AuthHeader'
import { getAllVetsConversations } from '@/utils/actions/GetAllVetsConversations'
import Link from 'next/link'


import React from 'react'

export default async function VeterinarioMessage() {

  const session = await auth()

  
  const vetId = session?.user?.id as string

  

  const allConversation = await  getAllVetsConversations(vetId)
  
  console.log("allConversation response > " + JSON.stringify(allConversation));
  return (
    <div className="h-screen w-full">
    <AuthHeader link="/veterinario/dashboard/create" linkText="+ Adicionar Pet" titleText="Vet Message"/>
    <div className="w-full h-[calc(100vh-5rem)] flex items-center justify-center flex-col gap-4 p-4">
        {allConversation.map((conversation) => (
          <Link key={conversation.id} href={`message/${conversation.id}`}>
            <div
              
              className="w-full max-w-lg p-4 bg-white shadow-md rounded-lg border border-gray-200 flex flex-col gap-2"
            >
              <h1 className="font-bold text-black text-2xl">{conversation.user.name}</h1>
              <p className="text-gray-700">Email: {conversation.user.email}</p>
              <p className="text-gray-400 text-sm">Conversation started on: {new Date(conversation.createdAt).toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
  </div>
  )
}
