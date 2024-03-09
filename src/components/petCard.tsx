"use client"

import { Pet } from "@/app/(auth)/dashboard/page";
import { getAllPets } from "@/utils/actions/GetAllPets";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


async function deletePet(petId:string){
  await fetch(`http://localhost:3000/api/pets/${petId}`,{
    method:"DELETE"
  })
}


export default function PetCard() {

 
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ['pets'],
    queryFn: getAllPets
  })

  const {mutate:removePetById} = useMutation({
    mutationFn: deletePet,
    onSuccess (_,variables) {
     const petId = variables
     const cached = queryClient.getQueryData(["pets"])

     
      queryClient.setQueryData(["pets"], data =>{
       const filteredPets = cached.filter((pet) =>{
            return pet.id !== petId
       })
      return filteredPets
    })
     
        
      
    }

  })


    async function handleRemovePet(petId:string){

       try {
         removePetById(petId)
       } catch (error) {
        console.log(error);
        
       }
       }

  return (
    <div className="h-[70%] w-[70%] flex gap-10 items-center justify-center ">
        {
       data? (data.map((pet:Pet) =>(
          <div className="flex-1 flex-wrap relative p-4 bg-brand-third text-white" key={pet.id}>
            <button className="absolute top-0 right-0 hover:bg-slate-200 p-2 hover:text-red-500"
            onClick={() =>  handleRemovePet(pet.id)}>X</button>
              <p>Pet Name: {pet.name}</p>
              <p>Pet age: {pet.age}</p>
          </div>
        ))) : (<div className="w-full h-screen flex items-center justify-center"> <p>Nenhum pet       Cadastrado no momento</p>
            </div>)
           }
      </div>
  )
}
