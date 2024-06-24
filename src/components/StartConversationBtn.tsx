"use client"

import React from 'react'

type StartConversationBtnType = {
    startConversation (vetId:string) : Promise<void>,
    vetId:string
}



export default function StartConversationBtn({startConversation,vetId} :StartConversationBtnType) {
  return (
    <button
    className="bg-brand-primary text-white py-2 px-4 rounded hover:bg-brand-secondary transition duration-300 absolute top-0 right-0 mr-4 mt-4"
    onClick={ () => startConversation(vetId)}
>
    Enviar mensagem
</button>
  )
}
