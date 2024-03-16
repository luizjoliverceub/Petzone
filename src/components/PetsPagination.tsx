import { Pet } from '@/app/(auth)/dashboard/page'
import { getAllPets } from '@/utils/actions/GetAllPets'
import Link from 'next/link'
import React from 'react'

export default async function PetsPagination() {

  const allPets = await getAllPets() as Pet[]

  return (
    <header className='w-full h-20 border-b border-b-slate-300'>
      <nav className='w-full h-full flex items-center justify-around '>
        {
          allPets.map((pet) =>(
            <Link href={`pets/${pet.id}`} key={pet.id} className='border-2 border-slate-500'>
              {pet.name}
            </Link>
          ))
        }
      </nav>
    </header>
  )
}
