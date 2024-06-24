import AuthHeader from '@/components/Auth/AuthHeader'
import PetCard from '@/components/PetCards'
import { getPetById } from '@/utils/actions/GetPetById'
import React from 'react'

export default async function PetPage({params} :{params:{id:string}}) {
    
    const petId = params.id
    const petById = await getPetById(petId) 

  
    console.log(petById);
    
    
    
  return (
    <main className="h-screen w-full flex flex-col">

          <AuthHeader titleText="Pet" link="/pets" linkText="voltar"/>

        <div className="w-full h-full  flex items-center justify-center">
          
          <div className="w-1/2 h-1/2">
            <PetCard petData={petById} remove/>
          </div>
        </div>
    </main>
  )
}
