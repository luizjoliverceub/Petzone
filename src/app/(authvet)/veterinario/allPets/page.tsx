"use client"

import AuthHeader from "@/components/Auth/AuthHeader";
import { ImSpinner9 } from "react-icons/im";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from 'sonner';
import { useState } from "react";
import { Pet } from "@/app/(auth)/dashboard/page";
import { getPetByidByVet } from "@/utils/actions/GetPetByIdByVet";
import PetsBoard from "@/components/Auth/vet/PetsBoard";



const AddPetSchema = z.object({
  id: z.string()
});

type typeAddPetSchema = z.infer<typeof AddPetSchema>


export default function VeterinarioAllpets() {

 

  const [pets,setPets] = useState<Pet[]>([])
  
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<typeAddPetSchema>({
    resolver: zodResolver(AddPetSchema)
  })

  async function OnSubmit(data: typeAddPetSchema) {


    const { id } = data

    const formatedData = {
      id
    }

    const resp = await getPetByidByVet(formatedData)
  
    console.log("resp here " + JSON.stringify(resp));
    
    console.log(pets)

    setPets((prev) => [...prev,resp])

    
    toast.success('Pet Adicionado com sucesso!')
   

  }

  async function remove(id: string) {
    const petsFiltered = pets.filter((pet) => pet.id !== id);
    setPets(petsFiltered);
    toast.success('Pet removido com sucesso!');
  }

  return (
    <div className="h-screen w-full">
      <AuthHeader link="/veterinario/dashboard/create" linkText="+Add Pet" titleText="Vet allPets" />

      <div className="w-full h-[calc(30%-5rem)] flex items-center justify-center border-b-2 border-black">
        <div className='h-full w-[65%] py-8'>

          <form className='flex flex-col justify-center items-center h-full gap-6 '
            noValidate
            onSubmit={handleSubmit(OnSubmit)}>


            <label htmlFor="id">Pet Id</label>
            <input type="text" className="ring-2 ring-black" {...register("id", { required: true })} />


            <button type='submit'
              disabled={isSubmitting}
              className='text-brand-secondary font-semibold px-3 py-1 bg-blue-100 opacity-80
                disabled:bg-slate-300 disabled:px-4 disabled:py-2'> {isSubmitting ? <ImSpinner9 /> : "Done"}
            </button>

          </form>
        </div>
      </div>

      <div className="h-[calc(70%)]  w-full ">
          
             <PetsBoard pets={pets} remove={remove}/>
          
      </div>

    </div>
  )
}
