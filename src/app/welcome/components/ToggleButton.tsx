'use client'
import { useState } from "react"
import React from 'react'
import { CardServices } from "./CardServices"

export function ToggleButton() {
    const [select, setSelect] = useState('pet')

    const handleSelect = (event: React.MouseEvent<HTMLButtonElement>) => {
        setSelect(event.currentTarget.value)
    }

    return (
        <div className="flex flex-col gap-8 justify-center items-center">
            <div className="max-w-[436px] border-2 flex gap-2 items-center justify-center p-1 rounded-xl">
                <button value='pet' className={`w-52 px-4 py-2 rounded-lg font-semibold ${select == 'pet' ? 'bg-brand-primary text-white' : 'hover:bg-brand-primary hover:text-white'} duration-200`} onClick={handleSelect}>Para você</button>
                <button value='vet' className={`w-52 px-4 py-2 rounded-lg font-semibold ${select == 'vet' ? 'bg-brand-primary text-white' : 'hover:bg-brand-primary hover:text-white'} duration-300`} onClick={handleSelect}>Para o seu veterinário</button>
            </div>
            {
                select == 'pet' ?
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-fade-in">
                        <CardServices
                            title="PetCard Digital"
                            description="A carteirinha digital do pet é uma forma prática de armazenar informações importantes sobre seu animal de estimação, como vacinas, consultas veterinárias e tratamentos, tudo em um aplicativo ou plataforma online."
                            petcard
                        />
                        <CardServices
                            title="Chat de mensagens"
                            description="A função de chat no Petzone permite que você entre em contato rapidamente com outros donos de animais, veterinários e pet shops, facilitando a troca de informações e agendamento de consultas"
                            chat
                        />
                        <CardServices
                            title="Consultas"
                            description="Dentro do Petzone você poderá realizar consultas onlines com os veterinários cadastrados dentro no sistema, sem sair de casa, para o seu conforto e de seu pet."
                            consult
                        />
                    </div>
                    :
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-fade-in">
                        <CardServices
                            title="Controle Consultas"
                            description="A carteirinha digital do pet é uma forma prática de armazenar informações importantes sobre seu animal de estimação, como vacinas, consultas veterinárias e tratamentos, tudo em um aplicativo ou plataforma online."
                            fileStack
                        />
                        <CardServices
                            title="Controle Pagamentos"
                            description="A função de chat no Petzone permite que você entre em contato rapidamente com outros donos de animais, veterinários e pet shops, facilitando a troca de informações e agendamento de consultas"
                            badgeDollarSign
                        />
                        <CardServices
                            title="Divulgação"
                            description="Dentro do Petzone você poderá realizar consultas onlines com os veterinários cadastrados dentro no sistema, sem sair de casa, para o seu conforto e de seu pet."
                            partyPopper
                        />
                    </div>
            }
        </div>
    )
}