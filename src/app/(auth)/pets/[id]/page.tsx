import AuthHeader from '@/components/AuthHeader'
import PetCard from '@/components/PetCards'
import { getPetById } from '@/utils/actions/GetPetById'
import React from 'react'

export default async function PetPage({params} :{params:{id:string}}) {
    
    const petId = params.id
    const petById = await getPetById(petId)

  
    
    
  return (
    <main className="h-screen w-full ">
    <AuthHeader titleText="My Pet" linkText="Back" link="/pets"/>
    <PetCard petData={petById}/>
  </main>
  )
}
