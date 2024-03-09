"use client"

import { ImSpinner9 } from "react-icons/im";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { addPet } from "@/utils/actions/AddPet";





const createPetSchema = z.object({
  name: z.string(),
  age: z.coerce.number(),
});

type CreatePetSchema = z.infer<typeof createPetSchema>;

export default function FormAuthCreatePet() {

  const {handleSubmit,register,formState:{isSubmitting}} = useForm<CreatePetSchema>({
    resolver: zodResolver(createPetSchema)
  })
 
  const queryClient = useQueryClient()
  const {data:session} = useSession() 
  const router = useRouter()
  

  const {mutateAsync:createPet} = useMutation({
    mutationFn: addPet,
    onSuccess (data,variables,context) {
      const cached = queryClient.getQueryData(["pets"])

      queryClient.setQueryData(["pets"], data =>{
        return [
          ...data,{
            age: variables.age,
            name: variables.name,
            userEmail: variables.userEmail
          }

        ]
      })
    }

  })

    async function OnSubmit(data:CreatePetSchema){

    
      try {
        await createPet({
          age: data.age,
          name: data.name,
          userEmail:session?.user?.email as string
        })
        router.push("/dashboard")
      } catch (error) {
        console.log(error);
        
      }

     
    }
    
  return (
    <div className='h-[90%] w-[90%] '>

        <form action="" className='flex flex-col justify-center items-center h-full gap-6'
        onSubmit={handleSubmit(OnSubmit)}>

            <label htmlFor="name">Pet Name</label>
            <input className='py-1 bg-slate-200'
             id='name'
            {...register("name",{required:true})} 
            />

            <label htmlFor="age">Age</label>
            <input className='py-1 bg-slate-200' 
             id='age'
             {...register("age",{required:true})} 
             />

            <button type='submit' 
            disabled={isSubmitting}
            className='text-brand-secondary font-semibold px-3 py-1 bg-blue-100 opacity-80
            disabled:bg-slate-300 disabled:px-4 disabled:py-2'> {isSubmitting ?<ImSpinner9/> : "Done"}
            </button>

        </form>
    </div>
  )
}
