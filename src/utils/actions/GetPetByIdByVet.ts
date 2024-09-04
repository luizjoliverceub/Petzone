"use server"

import { Pet } from "@/app/(auth)/dashboard/page";
import { auth } from "@/app/api/auth/[...nextauth]/route";
import * as z from "zod";

const createPetSchema = z.object({
  id: z.string()
});

type CreatePetSchema = z.infer<typeof createPetSchema>;

export async function getPetByidByVet(dataForm: CreatePetSchema) {

  const session = await auth()

  const resp = await fetch(`http://localhost:3000/api/pets/${dataForm.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "session": JSON.stringify(session)
    },

  })

  const data = await resp.json() as Pet[]

  return data
}