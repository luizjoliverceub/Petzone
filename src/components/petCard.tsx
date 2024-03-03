"use client"

import { Pet } from "@/app/(auth)/dashboard/page";



export default function PetCard({petData}:{petData:Pet[]}) {

    async function handleRemovePet(petId:string){
        console.log(`http://localhost:3000/api/pets/${petId}`);
        await fetch(`http://localhost:3000/api/pets/${petId}`,{
          method:"DELETE"
        })
        //fetch delete by id and revalidate page
       }

  return (
    <div className="h-[70%] w-[70%] flex gap-10 items-center justify-center ">
        {
        petData.map((pet:Pet) =>(
          <div className="flex-1 flex-wrap relative p-4 bg-brand-third text-white" key={pet.id}>
            <button className="absolute top-0 right-0 hover:bg-slate-200 p-2 hover:text-red-500"
            onClick={() => handleRemovePet(pet.id)}>X</button>
              <p>Pet Name: {pet.name}</p>
              <p>Pet age: {pet.age}</p>
          </div>
        ))
         }
      </div>
  )
}
