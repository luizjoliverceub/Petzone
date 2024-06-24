import { Pet } from '@/app/(auth)/dashboard/page'
import { getAllPets } from '@/utils/actions/GetAllPets'
import Link from 'next/link'
import React from 'react'


export default async function PetsPagination() {

  const allPets = await getAllPets() as Pet[]

  return (
    <header className='w-full h-20 border-b border-b-slate-300 flex justify-between px-4 items-center'>
      <nav className='w-[90%] h-full flex items-center justify-around '>
        {
         allPets.map((pet) =>(
            <Link href={`pets/${pet.id}`} key={pet.id} className=' text-brand-primary hover:text-brand-secondary'>
              {pet.name}
            </Link>
          ))
        }
      </nav>
      
        <Link href={"/dashboard/create"} className='text-brand-secondary font-semibold  px-3 py-1 bg-blue-100 opacity-80'>
          + Adicionar Pet
        </Link>
    </header>
  )
}
