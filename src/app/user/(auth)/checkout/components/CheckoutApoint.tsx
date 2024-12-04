import { InputMask } from "@react-input/mask";
import { CreateAppointmentSchema } from "../../consults/[id]/components/FormAppointment";
import { parseDate, parseHour } from "@/utils/actions/ParseDate";

export function CheckoutApointForm({ form, consultValue }: { form: CreateAppointmentSchema, consultValue: string | null }) {
    const formatted = (valor: any) => new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor)

    return (
        <form
            className="flex flex-col gap-5 border-[1px] p-6 bg-white rounded-lg 2xl:scale-100 xl:scale-75 w-[60%] shadow-md"
            noValidate
        >
            <div>
                <div className="w-full flex justify-between relative">
                    <h2 className="text-lg font-medium">Dados do agendamento</h2>
                </div>
                <p className="text-sm font-medium text-zinc-500">Verifique os campos abaixo para finalizar o agendamento</p>
            </div>

            <div className="flex flex-col gap-4">

                <div className="flex gap-2 w-full">
                    <div className="flex flex-col gap-1 w-full">
                        <label
                            htmlFor="clientName"
                            className="font-medium text-zinc-700 text-sm"
                        >
                            Nome do Cliente
                        </label>
                        <input
                            readOnly
                            className='px-4 py-2 border-2 rounded-md bg-white text-zinc-900 shadow- outline-none'
                            id='clientName'
                            disabled
                            value={form.clientName}
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-full">
                        <label
                            htmlFor="email"
                            className="font-medium text-zinc-700 text-sm"
                        >
                            Email
                        </label>
                        <input
                            readOnly
                            className='px-4 py-2 border-2 rounded-md bg-white text-zinc-900 shadow- outline-none'
                            id='email'
                            disabled
                            value={form.email}
                        />
                    </div>

                    <div className="flex flex-col gap-1 w-[245px]">
                        <label
                            htmlFor="phone"
                            className="font-medium text-zinc-700 text-sm"
                        >
                            Telefone
                        </label>
                        <InputMask
                            mask="(__) _ ____-____"
                            placeholder="(__) _ ____-____"
                            replacement={{ _: /\d/ }}
                            value={form.phone}
                            id='phone'
                            disabled
                            className="px-4 py-2 border-2 rounded-md outline-none bg-white text-zinc-900 shadow-"
                        />
                    </div>
                </div>

                <div className="flex gap-2 w-full">
                    <div className="flex flex-col gap-1">
                        <label
                            htmlFor="petId"
                            className="font-medium text-zinc-700 text-sm"
                        >
                            Pet
                        </label>
                        <input
                            className='px-4 py-2.5 border-2 rounded-md outline-none bg-white text-zinc-900 shadow-'
                            id='petId'
                            disabled
                            value={form.petId}
                        />

                    </div>

                    <div className="flex flex-col gap-1 w-[185px]">
                        <label
                            htmlFor="appointment_date"
                            className="font-medium text-zinc-700 text-sm"
                        >
                            Data
                        </label>
                        <InputMask
                            mask="__/__/____"
                            replacement={{ _: /\d/ }}
                            className='px-4 py-2.5 border-2 rounded-md outline-none bg-white text-zinc-900 shadow-'
                            value={parseDate(new Date(form.started_at))}
                            disabled
                            id='appointment_date'
                        />
                    </div>

                    <div className="flex flex-col gap-1 flex-1">
                        <label
                            htmlFor="hourAppointment"
                            className="font-medium text-zinc-700 text-sm"
                        >
                            Horario da Consulta
                        </label>
                        <input
                            className='px-4 py-2.5 border-2 rounded-md outline-none bg-white text-zinc-900 shadow-'
                            id='hourAppointment'
                            disabled
                            value={parseHour(new Date(form.started_at))}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="atendimento"
                        className="font-medium text-zinc-700 text-sm"
                    >
                        Atendimento
                    </label>
                    <input
                        className='px-4 py-2.5 border-2 rounded-md outline-none bg-white text-zinc-900 shadow-'
                        id='atendimento'
                        disabled
                        value={form.modality}
                    />

                    <label
                        htmlFor="service"
                        className="font-medium text-zinc-700 text-sm"
                    >
                        Serviço
                    </label>

                    <input
                        className='px-4 py-2.5 border-2 rounded-md outline-none bg-white text-zinc-900 shadow-'
                        id='service'
                        disabled
                        value={form.service}
                    />
                </div>
            </div>
            <div className="flex flex-col gap-4 font-medium text-white p-4 border rounded-xl shadow-lg bg-brand-third hover:shadow-xl duration-300">
                <div className="flex flex-col gap-2 text-sm font-semibold">
                    <div className="w-full flex justify-between">
                        <h3>Valor do serviço:</h3>
                        <h3 className="font-semibold">{formatted(consultValue)}</h3>
                    </div>
                    <div className="w-full flex justify-between">
                        <h3>Taxa fixa:</h3>
                        <h3 className="font-semibold">{formatted(20)}</h3>
                    </div>
                </div>
                <div className="w-full h-0.5 bg-zinc-100 rounded-xl"></div>
                <div className="w-full flex justify-between text-white text-lg">
                    <h3>Valor total:</h3>
                    <h3 className="font-semibold">{formatted(consultValue ? consultValue + 20 || 0 : 0)}</h3>
                </div>
            </div>
        </form>
    )
}