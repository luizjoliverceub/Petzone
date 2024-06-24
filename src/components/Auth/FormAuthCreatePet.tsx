"use client"

import { ImSpinner9 } from "react-icons/im";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { addPet } from "@/utils/actions/AddPet";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';

const createPetSchema = z.object({
  name: z.string().min(1,"Campo obrigatório"),
  age: z.coerce.number().min(1,"Idade mínima é de 1").max(100,"Idade máxima é de 100 anos"),
  city:z.string().min(1,"Campo obrigatório"),
  birthDate:z.date(),
  sex:z.enum(["M","H"],{
    errorMap :(issue,ctx) => ({message:"Sexo inválido "})
  }),
  notes:z.string().min(1,"Campo obrigatório"),
  race:z.string().min(1,"Campo obrigatório"),
  vaccination:z.string().min(1,"Este campo deve ser preenchido")
  });

 type typecreatePetSchema = z.infer<typeof createPetSchema>

export default function FormAuthCreatePet() {

  const session = useSession()
  
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors,isSubmitting }
  } = useForm<typecreatePetSchema>({
    resolver: zodResolver(createPetSchema)
  })

  async function OnSubmit(data:typecreatePetSchema) {

 
  const userEmail = session.data?.user?.email

  const formatedData ={
    userEmail,
    ...data
  }

 const resp = await addPet(formatedData)
 toast.success('Pet Criado com sucesso!')
 router.push("/pets")
   
  }

  return (
    <div className='h-full w-[65%] py-8'>

      <form className='flex flex-col justify-center items-center h-full gap-6'
        noValidate
        onSubmit={handleSubmit(OnSubmit)}>

        <div className="w-full h-full flex gap-4 ">

            <div className="h-full w-1/4  flex items-center justify-center">

              <div className="h-full w-full flex flex-col items-center justify-center">
                <label htmlFor="age"  className="self-start pl-5">Foto</label>
                <input type="text" className="w-[75%] h-[95%]
                border border-slate-300"
                id='age'
                {...register("age",{required:true})}
                />
                {errors.age && <p className="h-1 text-red-600">{errors.age.message}</p>}
              </div>
              
            </div>

        <div className="h-full w-3/4  flex flex-col items-center justify-center gap-6">
          <div className="w-[100%]">
            <label htmlFor="name">Nome do pet</label>
              <input className='py-1 border border-slate-300 w-full h-8 rounded-md'
               id='name'
              {...register("name",{required :true})}
              />
              {errors.name && <p className="h-1 text-red-600 text-sm">{errors.name?.message}</p>}
          </div>

          <div className="w-[100%] flex gap-4">
            <div className="w-1/2">
              <label htmlFor="birthDate">Data de nascimento</label>
                <input className='py-1 border border-slate-300 w-full h-8 rounded-md'
                 id='birthDate'
                 type="date"
                 formNoValidate

                {...register("birthDate",{required:true,
                  valueAsDate:true})}
                />
            </div>
            <div className="w-1/2">
              <label htmlFor="sex">Sexo</label>
                <input className='py-1 border border-slate-300 w-full h-8 rounded-md'
                 id='sex'
                {...register("sex",{required:true})}
                />
                {errors.sex && <p className="h-1 text-red-600 text-sm">{errors.sex.message}</p>}
            </div>
            <div className="w-1/2">
              <label htmlFor="sex">Raça</label>
                <input className='py-1 border border-slate-300 w-full h-8 rounded-md'
                 id='race'
                {...register("race",{required :true})}
                />
                {errors.race && <p className="h-1 text-red-600 text-sm">{errors.race.message}</p>}
            </div>
          </div>

          <div className="w-[100%]">
            <label htmlFor="name">Cidade</label>
              <input className='py-1 border border-slate-300 w-full h-8 rounded-md'
               id='city'
              {...register("city",{required :true})}
              />
              {errors.city && <p className="h-1 text-red-600 text-sm">{errors.city.message}</p>}
          </div>

        </div>
      
        </div>

        <div className="w-full h-full  ">
            <div className="w-full h-[90%]  flex flex-col justify-center items-center gap-14 ">

              <div className="w-full h-1/2 ">
                  <label htmlFor="vaccination">Vacinas</label>
                  <input className='py-1 border border-slate-300 w-full h-full rounded-md'
                  id='vaccination'
                  {...register("vaccination",{required :true})}
                  />
                  {errors.vaccination && <p className="text-red-600 text-sm">{errors.vaccination.message}</p>}
              </div>
              <div className="w-full h-1/2 ">
                <label htmlFor="notes">Anotações</label>
                <input className='py-1 border border-slate-300 w-full h-full rounded-md'
                id='notes'
                {...register("notes",{required :true})}
                />
                {errors.notes && <p className="h-1 text-red-600">{errors.notes.message}</p>}
              </div>

            </div>
        </div>

        <button type='submit'
          disabled={isSubmitting}
          className='text-brand-secondary font-semibold px-3 py-1 bg-blue-100 opacity-80
            disabled:bg-slate-300 disabled:px-4 disabled:py-2'> {isSubmitting ? <ImSpinner9 /> : "Done"}
        </button>

      </form>
    </div>
  )
}
