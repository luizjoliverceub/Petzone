"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route";
import { revalidateTag } from "next/cache";
import * as z from "zod";

const createPetSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Digite no minimo 2 caracteres'),
  age: z.coerce.number().min(2, 'Digite no minimo 2 caracteres'),
  city: z.string().min(2, 'Digite no minimo 2 caracteres'),
  birthDate: z.date(),
  userEmail: z.string().email({
    message: "Endereco de email invalido"
  }),
  sex: z.enum(["M", "F", "U"]),
  notes: z.string(),
  race: z.string().min(2, 'Raça inválida'),
  vaccination: z.string()
  // urlImage: z.string()
});

export type CreatePetSchema = z.infer<typeof createPetSchema>;

export async function addPet(dataForm: CreatePetSchema) {

  const session = await auth()

  const resp = await fetch("http://localhost:3000/api/pets/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "session": JSON.stringify(session)
    },
    body: JSON.stringify(dataForm)
  })

  revalidateTag('pets')

}