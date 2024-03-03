"use client"

import { ImSpinner9 } from "react-icons/im";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const createPetSchema = z.object({
  name: z.string(),
  age: z.coerce.number(),
});

type CreatePetSchema = z.infer<typeof createPetSchema>;

export default function FormAuthCreatePet() {

  const {handleSubmit,register,formState:{isSubmitting}} = useForm<CreatePetSchema>({
    resolver: zodResolver(createPetSchema)
  })
 
  const {data:session} = useSession() 
  const router = useRouter()
  


    async function onSubmit(data:CreatePetSchema){
      
    const dataForm =  {...data,userEmail:session?.user?.email}

     const res = await fetch("http://localhost:3000/api/pets/create",{
       method:"POST",
      headers:{
         "Content-Type":"application/json"
      },
      body: JSON.stringify(dataForm)
     })

     router.push("/dashboard")
      
    }
    
  return (
    <div className='h-[90%] w-[90%] '>

        <form action="" className='flex flex-col justify-center items-center h-full gap-6'
        onSubmit={handleSubmit(onSubmit)}>

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
