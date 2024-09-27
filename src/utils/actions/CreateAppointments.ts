"use server"

import { auth } from "@/app/api/auth/[...nextauth]/route";
import * as z from "zod";

const AppointmentSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  veterinarianProfileId: z.string(),
  petId: z.string(),
  appointment_date: z.string(),
  clientName: z.string().min(2, 'Digite no mínimo 2 caracteres'),
  phone: z.string().min(1, 'Telefone inválido'),
  service: z.string().min(2, 'Serviço inválido'),
  email: z.string().email('Endereço de email inválido')
});

type CreateAppointmentSchema = z.infer<typeof AppointmentSchema>;

export async function createAppointment(dataForm: CreateAppointmentSchema) {
  const session = await auth();

  const resp = await fetch("http://localhost:3000/api/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "session": JSON.stringify(session),
    },
    body: JSON.stringify(dataForm),
  });

  if (!resp.ok) {
    const errorText = await resp.text();
    console.error('Server error response:', resp.status, resp.statusText, errorText);
    throw new Error('Failed to add appointment');
  }
}
