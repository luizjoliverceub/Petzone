'use server';

import { auth } from "@/app/api/auth/[...nextauth]/route";
import * as z from "zod";

const VaccinationSchema = z.object({
  name: z.string().min(2, "Nome da vacina deve ter pelo menos 2 caracteres"),
  vaccination_date: z.string().min(10, 'Data inválida'), 
  petId: z.string().min(1, "ID do pet é obrigatório"),
});

type CreateVaccinationSchema = z.infer<typeof VaccinationSchema>;

export async function createVaccination(dataForm: CreateVaccinationSchema) {
  const session = await auth();

  if (!session) {
    throw new Error("Usuário não autenticado.");
  }

  const resp = await fetch("http://localhost:3000/api/vaccination", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "session": JSON.stringify(session),
    },
    body: JSON.stringify(dataForm),
  });

  if (!resp.ok) {
    const errorText = await resp.text();
    console.error("Erro ao criar a vacinação:", resp.status, resp.statusText, errorText);
    throw new Error(`Falha ao criar a vacinação: ${errorText}`);
  }

  return resp.json();
}
