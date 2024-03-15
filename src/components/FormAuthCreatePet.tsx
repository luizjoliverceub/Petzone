"use client"

import { ImSpinner9 } from "react-icons/im";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addPet } from "@/utils/actions/AddPet";





const createPetSchema = z.object({
  name: z.string(),
  age: z.coerce.number(),
  city:z.string(),
  birthDate:z.date(),
  sex:z.enum(["M","H"]),
  notes:z.string(),
  vaccination:z.string(),
  race:z.string()

});

type CreatePetSchema = z.infer<typeof createPetSchema>;

export default function FormAuthCreatePet() {

  const { handleSubmit, register, formState: { isSubmitting } } = useForm<CreatePetSchema>({
    resolver: zodResolver(createPetSchema)
  })

  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const router = useRouter()


  const { mutateAsync: createPet } = useMutation({
    mutationFn: addPet,
    onSuccess(data, variables, context) {
      const cached = queryClient.getQueryData(["pets"])

      queryClient.setQueryData(["pets"], data => {
        return [
          ...data, {
            age: variables.age,
            name: variables.name,
            city:variables.city,
            sex: variables.sex,
            birthDate:variables.birthDate,
            race:variables.race,
            notes:variables.notes,
            vaccination: variables.vaccination,
            userEmail: variables.userEmail
          }

        ]
      })
    }

  })

  async function OnSubmit(data: CreatePetSchema) {

    console.log(data);
    

    try {
      await createPet({
        age: data.age,
        name: data.name,
        city:data.city,
        sex: data.sex,
        birthDate:data.birthDate,
        notes:data.notes,
        race:data.race,
        vaccination: data.vaccination,
        userEmail: session?.user?.email as string
      })
      router.push("/pets")
    } catch (error) {
      console.log(error);

    }


  }

  return (
    <div className='h-full w-[65%] py-8'>

      <form action="" className='flex flex-col justify-center items-center h-full gap-4'
      noValidate
        onSubmit={handleSubmit(OnSubmit)}>

        <div className="w-full h-full flex gap-4 ">

            <div className="h-full w-1/4 0 flex items-center justify-center">

              <div className="h-full w-full flex flex-col items-center justify-center">
                <label htmlFor="age"  className="self-start pl-5">Photo</label>
                <input type="text" className="w-[75%] h-[75%]
                border border-slate-300"
                id='age'
                {...register("age",{required:true})}
                />
              </div>
              
            </div>

        <div className="h-full w-3/4  flex flex-col items-center justify-center">
          <div className="w-[100%]">
            <label htmlFor="name">Pet Name</label>
              <input className='py-1 border border-slate-300 w-full h-8 rounded-md'
               id='name'
              {...register("name",{required:true})}
              />
          </div>

          <div className="w-[100%] flex gap-4">
            <div className="w-1/2">
              <label htmlFor="birthDate">Birth Date</label>
                <input className='py-1 border border-slate-300 w-full h-8 rounded-md'
                 id='birthDate'
                 type="date"
                 formNoValidate

                {...register("birthDate",{required:true,
                  valueAsDate:true})}
                />
            </div>
            <div className="w-1/2">
              <label htmlFor="sex">Sex</label>
                <input className='py-1 border border-slate-300 w-full h-8 rounded-md'
                 id='sex'
                {...register("sex",{required:true})}
                />
            </div>
            <div className="w-1/2">
              <label htmlFor="sex">Race</label>
                <input className='py-1 border border-slate-300 w-full h-8 rounded-md'
                 id='race'
                {...register("race",{required:true})}
                />
            </div>
          </div>

          <div className="w-[100%]">
            <label htmlFor="name">City</label>
              <input className='py-1 border border-slate-300 w-full h-8 rounded-md'
               id='city'
              {...register("city",{required:true})}
              />
          </div>

        </div>
      
        </div>

        <div className="w-full h-full  ">
            <div className="w-full h-[90%]  flex flex-col justify-center items-center gap-10 ">

              <div className="w-full h-1/2 ">
                  <label htmlFor="vaccination">vaccination</label>
                  <input className='py-1 border border-slate-300 w-full h-full rounded-md'
                  id='vaccination'
                  {...register("vaccination",{required:true})}
                  />
              </div>
              <div className="w-full h-1/2 ">
                <label htmlFor="notes">Notes</label>
                <input className='py-1 border border-slate-300 w-full h-full rounded-md'
                id='notes'
                {...register("notes",{required:true})}
                />
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
