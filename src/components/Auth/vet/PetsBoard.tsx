import { Pet } from '@/app/(auth)/dashboard/page'
import React from 'react'


export default function PetsBoard({pets,remove} :{pets:Pet[], remove:(id:string) => void}) {

  const petBirthDate =  pets.length > 0 ? new Date(pets[0]?.birthDate) : null
  const formatedDate = petBirthDate !== null ? new Intl.DateTimeFormat("pt-br").format(petBirthDate) : null

  return (
    <section className="w-full h-full  flex flex-col gap-10 items-center justify-center p-4 ">
      {pets.length > 0 ? pets.map(pet => (
        <article className="w-[80%] max-w bg-slate-100 shadow-lg rounded-lg overflow-hidden my-4 hover:bg-slate-200" key={pet.id}>
          <div className="p-6 relative">
            <h2 className="text-2xl font-bold mb-2">{pet.name}</h2>
            <ul className="text-gray-700 mb-4">
              <div className='flex gap-8'>
                <li><strong>Idade:</strong> {pet.age} anos</li>
                <li><strong>Raça:</strong> {pet.race}</li>
                <li><strong>Cidade:</strong> {pet.city}</li>
              </div>
              <div className='flex gap-8'>
                <li>Data de Nascimento: <strong>{formatedDate}</strong></li>
                <li><strong>Sexo:</strong> {pet.sex === "M" ? "Macho" : "Fêmea"}</li>
                <li><strong>Vacinação:</strong> {pet.vaccination}</li>
              </div>
              <li><strong>Observações:</strong> {pet.notes}</li>
            </ul>
            <button 
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-300 absolute top-0 right-0 mr-4 mt-4" 
             
            >
              X
            </button>
          </div>
        </article>
      )) : (
        <p className="w-full h-full flex items-center justify-center text-xl text-gray-700">
          Nenhum pet adicionado pelo veterinário...
        </p>
      )}
    </section>
  )
}




