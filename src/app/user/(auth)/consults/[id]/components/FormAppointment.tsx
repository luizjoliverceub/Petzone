"use client"

import { ImSpinner9 } from "react-icons/im";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from 'sonner';
import { createAppointment } from "@/utils/actions/CreateAppointments";
import { useUser } from "@/contexts/UserContext";

const AppointmentSchema = z.object({
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

export function FormCreateAppointment({ vetId }: { vetId: string }) {
  const { session } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CreateAppointmentSchema>({
    resolver: zodResolver(AppointmentSchema)
  });


  async function onSubmit(data: CreateAppointmentSchema) {
    try {
      console.log("Submitted data:", data);

      const formattedData = {
        ...data,
        appointment_date: new Date(data.appointment_date),
      };

      await createAppointment(formattedData);
      toast.success('Agendamento criado com sucesso!');
      reset();
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error('Erro ao criar agendamento');
    }
  }

  return (
    <div className='h-full w-[65%] py-8'>
      <form className='flex flex-col justify-center items-center h-full gap-6'
        noValidate
        onSubmit={handleSubmit(onSubmit)}>

        <div className="w-full h-full flex gap-4">

          <div className="h-full w-1/4 flex items-center justify-center">
            <div className="h-full w-full flex flex-col items-center justify-center">
              <label htmlFor="appointment_date" className="self-start pl-5">Data do Agendamento</label>
              <input type="date" className="border border-slate-300"
                id='appointment_date'
                {...register("appointment_date", { required: true })}
              />
              {errors.appointment_date && <p className="h-1 text-red-600">{errors.appointment_date.message}</p>}
            </div>
          </div>

          <div className="h-full w-3/4 flex flex-col items-center justify-center gap-6">
            <div className="w-[100%]">
              <label htmlFor="clientName">Nome do Cliente</label>
              <input
                className='py-1 border border-slate-300 w-full h-8 rounded-md'
                id='clientName'
                value={session?.user?.name || ''}
                {...register("clientName", { required: true })}
              />
              {errors.clientName && <p className="h-1 text-red-600 text-sm">{errors.clientName.message}</p>}
            </div>

            <input
              className='hidden'
              id='veterinarianProfileId'
              value={vetId}
              {...register("veterinarianProfileId", { required: true })}
            />

            <input
              className=''
              id='userId'
              {...register("userId", { required: true })}
            />

            <div className="w-[100%] flex gap-4">
              <div className="w-1/2">
                <label htmlFor="phone">Telefone</label>
                <input className='py-1 border border-slate-300 w-full h-8 rounded-md'
                  id='phone'
                  {...register("phone", { required: true })}
                />
                {errors.phone && <p className="h-1 text-red-600 text-sm">{errors.phone.message}</p>}
              </div>
              <div className="w-1/2">
                <label htmlFor="service">Serviço</label>
                <input className='py-1 border border-slate-300 w-full h-8 rounded-md'
                  id='service'
                  {...register("service", { required: true })}
                />
                {errors.service && <p className="h-1 text-red-600 text-sm">{errors.service.message}</p>}
              </div>
            </div>

            <div className="w-[100%]">
              <label htmlFor="email">Email</label>
              <input
                className='py-1 border border-slate-300 w-full h-8 rounded-md'
                id='email'
                value={session?.user?.email || ''}
                {...register("email", { required: true })}
              />
              {errors.email && <p className="h-1 text-red-600 text-sm">{errors.email.message}</p>}
            </div>

            <div className="w-[100%]">
              <label htmlFor="petId">PetId:</label>
              <input
                className='py-1 border border-slate-300 w-full h-8 rounded-md'
                id='petId'
                {...register("petId", { required: true })}
              />
              {errors.petId && <p className="h-1 text-red-600 text-sm">{errors.petId.message}</p>}
            </div>
          </div>
        </div>

        <button type='submit'
          disabled={isSubmitting}
          className='text-white border-2 border-transparent font-semibold px-4 py-2 bg-brand-secondary rounded-lg hover:border-brand-secondary hover:bg-transparent hover:text-brand-secondary duration-300'>
          {isSubmitting ? <ImSpinner9 /> : "Criar Agendamento"}
        </button>
      </form>
    </div>
  );
}

