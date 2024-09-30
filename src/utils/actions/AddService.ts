"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route"
import { ServiceFormSchema } from "@/app/vet/(auth)/config/services/components/FormService";


export async function addService(dataForm: ServiceFormSchema) {
  const session = await auth()

  const resp = await fetch("http://localhost:3000/api/service", {
    method: "POST",
    headers: {
      'session': JSON.stringify(session)
    },
    body: JSON.stringify(dataForm),
  })


  if (!resp.ok) {
    const errorText = await resp.text();
    console.error("Erro ao adicionar servico:", resp.status, resp.statusText, errorText);
    throw new Error(`Falha ao adicionar servico: ${errorText}`);
  }

  return resp.json();
}