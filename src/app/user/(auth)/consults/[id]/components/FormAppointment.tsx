"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from 'sonner';
import { createAppointment } from "@/utils/actions/CreateAppointments";
import { useQuery, useMutation } from "@tanstack/react-query";
import { LoaderCircle, Trash2, X } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { queryClient } from "@/hooks/useQuery";
import { ServiceType } from "@/app/vet/(auth)/config/services/components/VetServices";
import { getAllService } from "@/utils/actions/GetAllVetServices";
import { useEffect, useState } from "react";
import { InputMask } from '@react-input/mask';
import dayjs from "dayjs";
import { AppointmentsArray } from "@/models/Types";
import { parseDate2, parseHour } from "@/utils/actions/ParseDate";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { createConversation } from "@/utils/actions/CreateConversation";
import { getModality } from "@/utils/actions/GetModality";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import CompletePage from "./CompletePage";
import CheckoutForm from "./CheckoutForm";
import convertToSubCurrency from "@/lib/convertToSubCurrency";

const AppointmentSchema = z.object({
  userId: z.string(),
  veterinarianProfileId: z.string(),
  petId: z.string(),
  appointment_date: z.string().optional(),
  ended_at: z.string(),
  started_at: z.string(),
  clientName: z.string().min(2, 'Digite no mínimo 2 caracteres'),
  phone: z.string().min(1, 'Telefone inválido'),
  service: z.string().min(2, 'Serviço inválido'),
  email: z.string().email('Endereço de email inválido'),
  modality: z.string()
});

export type CreateAppointmentSchema = z.infer<typeof AppointmentSchema>;


export function FormCreateAppointment({ id, vetId, handle, userId, appointArray, vetEmail, stripe }: { id: string, vetId: string, handle: () => void, userId: string | undefined, appointArray: AppointmentsArray[] | undefined, vetEmail: string | undefined, stripe: any }) {
  const { pets, session, handleAmount } = useUser();
  const [consultValue, setConsultValue] = useState('')
  const [date, setDate] = useState('')
  const router = useRouter()
  const [hoursInput, setHoursInput] = useState(hours)
  const [dataForm, setDataForm] = useState({} as CreateAppointmentSchema)
  const [clientSecret, setClientSecret] = useState("");
  const [dpmCheckerLink, setDpmCheckerLink] = useState("");
  const [confirmed, setConfirmed] = useState(false);


  useEffect(() => {
    setConfirmed(new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    ));
  }, [setConfirmed]);



  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  const { data } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const data: ServiceType[] = await getAllService()

      return data
    }
  })

  const { data: modalityData } = useQuery({
    queryKey: ['modality', vetId],
    queryFn: async () => {
      const data: { modality: string[] } = await getModality(vetId)

      return data
    },
    enabled: !!vetId
  })

  console.log(modalityData)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<CreateAppointmentSchema>({
    resolver: zodResolver(AppointmentSchema)
  });

  const createAppointmentMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      toast.success('Agendamento criado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['appoint'] })
      handle();
      reset();
      router.push(`/user/checkout`)
      // createRoom(dataForm)
    },
    onError: () => {
      toast.error('Erro ao criar agendamento');
    }
  });

  // const { data: sessionData } = useSession()
  // const router = useRouter()
  // const userEmail = sessionData?.user?.email

  // const createRoom = async (data: CreateAppointmentSchema) => {
  //   const now = dayjs()

  //   const res = await createConversation({
  //     clientEmail: userEmail,
  //     veterinarianEmail: vetEmail,
  //     session: sessionData,
  //     started_at: dayjs(data.started_at),
  //     ended_at: dayjs(data.ended_at)
  //   })

  //   const conversationId = res.id
  //   console.log(res)
  //   console.log(dayjs(data.started_at))
  //   console.log(dayjs(data.ended_at))

  //   router.push(`/user/message/${conversationId}`)
  // }

  async function onSubmit(data: CreateAppointmentSchema) {
    const formatedData = {
      ...data,
      appointment_date: date,
      started_at: `${date}T${data.started_at}:00`,

      ended_at: dayjs(`${date}T${data.started_at}:00`)
        .add(30, 'minute')
        .format('YYYY-MM-DDTHH:mm:ss')
    };

    const apointForm = localStorage.getItem('apointForm')
    const amountLocalStorage = localStorage.getItem('amount')

    if (apointForm) {
      localStorage.removeItem('apointForm')
    }

    if (amountLocalStorage) {
      localStorage.removeItem('amount')
    }

    localStorage.setItem('amount', consultValue + 20)
    localStorage.setItem('apointForm', JSON.stringify(formatedData))


    router.push(`/user/checkout`)
    // createAppointmentMutation.mutate(formatedData);
  }

  // async function handleClickedService (){

  //   const amount = Number(consultValue + 20)

  //     const response = await fetch('/api/create-payment-intent', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ amount: convertToSubCurrency(amount)}),
  //     });

  //     const { clientSecret, dpmCheckerLink} = await response.json();

  //     setClientSecret(clientSecret);
  //     // [DEV] For demo purposes only
  //     setDpmCheckerLink(dpmCheckerLink);

  //     console.log("ClientSecret " + clientSecret);


  //     console.log("Bateu dentro if");



  // }

  const formatted = (valor: any) => new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor)

  const handlePrice = (price: string) => {
    setConsultValue(price)
  }

  useEffect(() => {
    const filteredHours = hours.filter(item => {
      const isOccupied = appointArray?.some(a => {
        const dateParse = parseDate2(a.started_at);
        return dateParse === date && parseHour(a.started_at) === item;
      });
      return !isOccupied
    });

    setHoursInput(filteredHours)
  }, [date, appointArray, modalityData]);

  return (
    <div className="h-full w-full absolute z-50 animate-fade-in top-0 right-0 bg-black/50 flex justify-center items-center">
      <form
        className="flex flex-col gap-5 border-2 p-6 bg-gray-100 rounded-xl w-[490px] 2xl:scale-100 xl:scale-75"
        noValidate
        onSubmit={handleSubmit(onSubmit)}>

        <div>
          <div className="w-full flex justify-between relative">
            <h2 className="text-lg font-medium">Agendamento de consulta</h2>
            <button
              type="button"
              className="text-zinc-400 hover:text-red-500 duration-300 absolute -top-3 -right-3"
              onClick={handle}
            >
              <X className="size-6" />
            </button>
          </div>
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
          value={userId}
          {...register("userId", { required: true })}
        />

        <input
          className='hidden'
          id='ended_at'
          value=''
          {...register("ended_at", { required: true })}
        />

        <div className="flex flex-col gap-4">
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
                <option value="" disabled className="2xl:text-lg xl:text-sm">
                  Selecione um pet
                </option>
                {pets?.map(pet => (
                  <option
                    value={pet.id}
                    key={pet.id}
                    className="font-medium 2xl:text-lg xl:text-sm"
                  >
                    {pet.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1 w-[245px]">
              <label
                htmlFor="phone"
                className="font-medium text-zinc-700 text-sm"
              >
                Telefone {errors.phone && <span className="text-red-600">*</span>}
              </label>
              <InputMask
                mask="(__) _ ____-____"
                placeholder="(__) _ ____-____"
                replacement={{ _: /\d/ }}
                id='phone'
                className="px-4 py-2 border-2 rounded-md outline-none"
                {...register("phone", { required: true })}
              />
            </div>
          </div>

          <div className="flex gap-2">
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
                value={date}
                id='appointment_date'
                onChange={event => setDate(event.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <label
                htmlFor="hourAppointment"
                className="font-medium text-zinc-700 text-sm"
              >
                Horario da Consulta
              </label>
              <select
                className='px-4 py-2.5 border-2 rounded-md outline-none bg-white'
                id='hourAppointment'
                defaultValue=""
                {...register("started_at", { required: true })}
              >
                <option value="" disabled className="2xl:text-lg xl:text-sm">
                  Selecione um horário
                </option>
                {hoursInput.map((hour, i) => (
                  <option value={hour} key={i} className="font-medium 2xl:text-lg xl:text-sm">
                    {hour}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="atendimento"
              className="font-medium text-zinc-700 text-sm"
            >
              Atendimento
            </label>
            <select
              className='px-4 py-2.5 border-2 rounded-md outline-none bg-white'
              id='atendimento'
              defaultValue=""
              {...register("modality", { required: true })}
            >

              <option value="" disabled className="2xl:text-lg xl:text-sm">
                Selecione o tipo de atendimento
              </option>
              {modalityData?.modality?.map(item => (
                <option value={item} key={item} className="font-medium 2xl:text-lg xl:text-sm">
                  {item}
                </option>
              ))}
            </select>

            <label
              htmlFor="service"
              className="font-medium text-zinc-700 text-sm"
            >
              Serviço
            </label>
            <select
              className='px-4 py-2.5 border-2 rounded-md outline-none bg-white'
              id='service'
              defaultValue=""
              //onClick={handleClickedService}
              {...register("service", { required: true })}
              onChange={(e) => {
                const selectedService = data?.find(service => service.name === e.target.value);
                if (selectedService) {
                  handlePrice(selectedService.price);
                }
              }
              }
            >
              <option value="" disabled className="2xl:text-lg xl:text-sm">
                Selecione um serviço
              </option>

              {data?.map(service => (
                <option value={service.name} key={service.id} className="font-medium 2xl:text-lg xl:text-sm">
                  {service.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-4 font-medium text-zinc-500 p-4 border rounded-xl shadow-lg bg-white hover:shadow-xl duration-300">
          <div className="flex flex-col gap-2 text-sm font-semibold">
            <div className="w-full flex justify-between">
              <h3>Valor do serviço:</h3>
              <h3 className="font-semibold">{consultValue ? formatted(consultValue) : 'R$ --,--'}</h3>
            </div>
            <div className="w-full flex justify-between">
              <h3>Taxa fixa:</h3>
              <h3 className="font-semibold">{formatted(20)}</h3>
            </div>
          </div>
          <div className="w-full h-0.5 bg-zinc-300 rounded-xl"></div>
          <div className="w-full flex justify-between text-brand-primary">
            <h3>Valor total:</h3>
            <h3 className="font-semibold">{formatted(consultValue + 20 || 0)}</h3>
          </div>
        </div>
        <button
          type='submit'
          disabled={createAppointmentMutation.isPending}
          className='text-white border-2 border-transparent font-semibold py-2 bg-brand-secondary rounded-lg hover:border-brand-secondary hover:bg-transparent hover:text-brand-secondary duration-300 flex gap-2 justify-center items-center'>
          {createAppointmentMutation.isPending ?
            <>
              <span>Agendando</span>
              <LoaderCircle className="animate-spin size-5" />
            </>
            :
            <span>Ir para pagamento</span>
          }
        </button>
      </form>
    </div>
  );
}

const hours = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
];