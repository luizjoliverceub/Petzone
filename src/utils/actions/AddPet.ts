"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route";
import { revalidateTag } from "next/cache";
import * as z from "zod";

const createPetSchema = z.object({
  name: z.string(),
  age: z.coerce.number(),
  city:z.string(),
  birthDate:z.date(),
  userEmail:z.string().email({
    message:"Invalid email addres"
  }),
  sex:z.enum(["M","H"]),
  notes:z.string(),
  race:z.string(),
  vaccination:z.string()
  });
  
type CreatePetSchema = z.infer<typeof createPetSchema>;

export async function addPet(dataForm:CreatePetSchema){
      

const session = await auth()

  
    const resp = await fetch("http://localhost:3000/api/pets/create",{
      method:"POST",
      headers:{
         "Content-Type":"application/json",
         "session": JSON.stringify(session)
     },
       body: JSON.stringify(dataForm)
     })
  
     revalidateTag('pets')
   
    
    
  
  }