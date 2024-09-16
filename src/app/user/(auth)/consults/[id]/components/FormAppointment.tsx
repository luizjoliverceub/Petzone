"use client"

import { ImSpinner9 } from "react-icons/im";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from 'sonner';
import { createAppointment } from "@/utils/actions/CreateAppointments";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "@/utils/actions/GetUser";
import { LoaderCircle, X } from "lucide-react";
import { Span } from "next/dist/trace";
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

export function FormCreateAppointment({ vetId, handle }: { vetId: string, handle: () => void }) {
  const { pets, session } = useUser()

  const email = session?.user?.email

  const { data } = useQuery({
    queryKey: ['user-data', email],
    queryFn: async () => {
      if (!email) {
        throw new Error('Email is not defined')
      }
      const user = await getUser(email)
      return user
    },
    enabled: !!email
  })

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
    <>
      <div className="h-screen w-full bg-black opacity-80 absolute z-40 top-0 right-0" />
      <div className="absolute z-50 animate-fade-in top-44">
        <button
          type="button"
          className="text-zinc-400 hover:text-red-500 duration-300 absolute -top-8 -right-8"
          onClick={handle}
        >
          <X className="size-7" />
        </button>
        <form
          className="flex flex-col gap-5 border-2 p-6 bg-white rounded-xl w-[490px]"
          noValidate
          onSubmit={handleSubmit(onSubmit)}>

          <div>
            <h2 className="text-lg font-medium">Agendamento de consulta</h2>
            <p className="text-sm font-medium text-zinc-500">Preencha o campos abaixo para realizar um agendamento</p>
          </div>

          <input
            className='hidden'
            id='veterinarianProfileId'
            value={vetId}
            {...register("veterinarianProfileId", { required: true })}
          />

          <input
            className='hidden'
            id='userId'
            value={data?.id}
            {...register("userId", { required: true })}
          />

          <div className="flex flex-col gap-2">

            <div className="flex flex-col gap-1">
              <label
                htmlFor="clientName"
                className="font-medium text-zinc-700 text-sm"
              >
                Nome do Cliente{errors.clientName && <span className="text-red-600">*</span>}
              </label>
              <input
                readOnly
                className='px-4 py-2 border-2 rounded-md bg-gray-200 text-zinc-500 outline-none'
                id='clientName'
                value={session?.user?.name || ''}
                {...register("clientName", { required: true })}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="font-medium text-zinc-700 text-sm"
              >
                Email{errors.email && <span className="text-red-600">*</span>}
              </label>
              <input
                readOnly
                className='px-4 py-2 border-2 rounded-md bg-gray-200 text-zinc-500 outline-none'
                id='email'
                value={session?.user?.email || ''}
                {...register("email", { required: true })}
              />
            </div>

            <div className="flex gap-2 w-full">
              {/* Input de PetID */}
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="petId"
                  className="font-medium text-zinc-700 text-sm"
                >
                  Pet{errors.petId && <span className="text-red-600">*</span>}
                </label>
                <select
                  className='px-4 py-2.5 border-2 rounded-md outline-none bg-white'
                  id='petId'
                  defaultValue=""
                  {...register("petId", { required: true })}
                >
                  <option
                    value=""
                    disabled
                  >
                    Selecione um pet
                  </option>

                  {pets?.map(pet => (
                    <option
                      value={pet.id}
                      key={pet.id}
                      className="font-medium"
                    >
                      {pet.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Input de telefone */}
              <div className="flex flex-col gap-1 w-[245px]">
                <label
                  htmlFor="phone"
                  className="font-medium text-zinc-700 text-sm"
                >
                  Telefone {errors.phone && <span className="text-red-600">*</span>}
                </label>
                <input
                  className='px-4 py-2 border-2 rounded-md outline-none'
                  id='phone'
                  {...register("phone", { required: true })}
                />
              </div>
            </div>

            <div className="flex gap-2">

              {/* Input de data */}
              <div className="flex flex-col gap-1 w-[185px]">
                <label
                  htmlFor="appointment_date"
                  className="font-medium text-zinc-700 text-sm"
                >
                  Data{errors.appointment_date && <span className="text-red-600">*</span>}
                </label>
                <input
                  type="date"
                  className='px-4 py-2 border-2 rounded-md outline-none'
                  id='appointment_date'
                  {...register("appointment_date", { required: true })}
                />
              </div>

              {/* Input de Horario */}
              <div className="flex flex-col gap-1 flex-1">
                <label
                  htmlFor="hourAppointment"
                  className="font-medium text-zinc-700 text-sm"
                >
                  Horário
                </label>
                <select
                  className='px-4 py-2.5 border-2 rounded-md outline-none bg-white'
                  id='hourAppointment'
                  defaultValue=""
                >
                  <option
                    value=""
                    disabled
                  >
                    Selecione um horário
                  </option>

                  {hours?.map(hour => (
                    <option
                      value={hour}
                      key={hour}
                      className="font-medium"
                    >
                      {hour}
                    </option>
                  ))}
                </select>
              </div>

            </div>

            {/* Input de servico */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="service"
                className="font-medium text-zinc-700 text-sm"
              >
                Serviço{errors.service && <span className="text-red-600">*</span>}
              </label>
              <input className='px-4 py-2 border-2 rounded-md outline-none'
                id='service'
                {...register("service", { required: true })}
              />
            </div>

          </div>

          {/* Botao de submit */}
          <button
            type='submit'
            disabled={isSubmitting}
            className='text-white border-2 border-transparent font-semibold py-2 bg-brand-secondary rounded-lg hover:border-brand-secondary hover:bg-transparent hover:text-brand-secondary duration-300 flex gap-2 justify-center items-center'>
            {isSubmitting ?
              <>
                <span>Agendando</span>
                <LoaderCircle className="animate-spin size-5" />
              </>
              :
              <span>Agendar consulta</span>
            }
          </button>
        </form>
      </div>
    </>
  );
}

const hours = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', 
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', 
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', 
  '17:00', '17:30', '18:00'
];