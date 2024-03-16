"use client"

import { Pet } from '@/app/(auth)/dashboard/page'
import { removePetById } from '@/utils/actions/RemovePetById';


export default function PetCard({petData} :{petData:Pet[]}) {

  
  

    async function handleRemovePet(petId:string){

        try {
          await removePetById(petId)
        } catch (error) {
         console.log(error);
         
        }
        }

  return (
    <div className='h-[calc(100vh-5rem)] w-full flex gap-10 items-center justify-center bg-blue-500'>
        {
           petData.length > 0  ? (petData.map((pet) =>(
                <div key={pet.id} className='flex-1 flex-wrap relative p-4 bg-brand-third text-white'>
                    <button className="absolute top-0 right-0 hover:bg-slate-200 p-2 hover:text-red-500"
                    onClick={() =>  handleRemovePet(pet.id)}>X
                    </button>
                    <p>{pet.name}</p>
                </div>
            )))  : (<p>Nenhum pet cadastrado ...</p>)
        }
    </div>
  )
}
