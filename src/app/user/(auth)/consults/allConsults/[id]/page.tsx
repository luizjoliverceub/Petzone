'use client'

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, Check, Ellipsis } from "lucide-react";
import { parseDate } from "@/utils/actions/ParseDate";
import { useQuery } from "@tanstack/react-query";
import { AppointmentType, VeterinarianType } from "@/models/Types";
import { useState } from "react";
import { parseStatus, statusColor } from "@/utils/actions/parseStatus";
import { useUser } from "@/contexts/UserContext";

export default function Home() {
    const { id } = useParams<{ id: string }>();
    const [appointments, setAppointments] = useState()
    const [vetProfile, setVetProfile] = useState()
    const [isClicked, setIsClicked] = useState(false)
    const { pets } = useUser();

    const { data, isLoading, error } = useQuery<AppointmentType>({
        queryKey: ['appoint-data', id],
        queryFn: async () => {
            const data = await fetch(`/api/appointments/${id}`).then(res => res.json())
            setAppointments(data)
            return data
        },
        enabled: !!id
    })

    // console.log(appointments)

    const clipboardBtn = (id: string | undefined) => {
        setIsClicked(true);
        navigator.clipboard.writeText(id || '')
        setTimeout(() => {
            setIsClicked(false);
        }, 3000);
    }

    const petSelect = pets.find(pet => pet.id === data?.petId)

    if (error) return (
        <div className="h-screen flex-1 flex items-center justify-center py-4 pr-4">
            <div className="w-full h-full border-2 flex gap-8 flex-col rounded-xl p-4 animate-fade-in shadow-md items-center justify-center">
                <h2 className="font-semibold text-3xl">Oppps... Não foi possivel achar a sua consulta.</h2>
                <Link
                    href={'/vets/myConsults'}
                    className="px-4 py-2 bg-brand-secondary border-2 border-transparent text-wrap font-semibold hover:bg-transparent hover:text-brand-secondary border-brand-secondary duration-300"
                >
                    Voltar
                </Link>
            </div>
        </div>)

    return (
        <div className="h-screen flex-1 flex items-center justify-center py-4 pr-4">
            <div className="w-full h-full border-2 flex gap-8 flex-col rounded-xl p-4 animate-fade-in shadow-md">
                <Link
                    href={'/user/consults'}
                    className="text-zinc-500 hover:text-brand-secondary duration-300 flex gap-2"
                >
                    <ArrowLeft />
                    <span className="font-medium">Voltar</span>
                </Link>
                <div className="flex p-8 gap-10">
                    <div className="h-60 w-60 rounded-full bg-zinc-800" />

                    <div className="flex flex-col gap-8 justify-center">
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-2 items-center group">
                                {
                                    isLoading ? <div className="rounded-lg bg-zinc-300 animate-pulse w-64 h-9" /> :
                                        <h2 className="font-semibold text-3xl animate-fade-in">{petSelect?.name}</h2>
                                }
                            </div>
                            <div>
                                {
                                    isLoading ? <div className="rounded-lg bg-zinc-300 animate-pulse w-40 h-6" /> :
                                        <h3 className="flex gap-1 items-center font-medium animate-fade-in"><span className="text-zinc-500">Status: </span> {parseStatus(data?.status)}<div className={`h-2.5 w-2.5 rounded-full bg-${statusColor(data?.status)}`} /></h3>
                                }
                            </div>
                            <div className="flex 2xl:flex-row 2xl:gap-4 xl:flex-col xl:gap-1.5">
                                {
                                    isLoading ? <div className="rounded-lg bg-zinc-300 animate-pulse w-40 h-6" /> :
                                        <h3 className="font-medium animate-fade-in"><span className="text-zinc-500">Email:</span> {data?.email}</h3>
                                }

                                {
                                    isLoading ? <div className="rounded-lg bg-zinc-300 animate-pulse w-32 h-6" /> :
                                        <h3 className="font-medium animate-fade-in"><span className="text-zinc-500">Telefone:</span> {data?.phone}</h3>
                                }

                            </div>
                        </div>
                        <div className="flex gap-4">

                            <div className="flex flex-col items-center justify-center">
                                {
                                    data?.status == 'confirmed' &&
                                    <Link
                                        href={'/user/message'}
                                        className={`px-4 py-2 border-2 rounded-lg border-transparent ${isLoading ? 'bg-zinc-800 text-white' : 'bg-brand-primary text-white hover:bg-transparent hover:text-brand-primary hover:border-brand-primary'} font-semibold  duration-300`}
                                    >
                                        Chat da Consulta
                                    </Link>
                                }
                            </div>

                            <div className="flex flex-col items-center justify-center">
                                <Link
                                    href={`/user/consults/${data?.veterinarianProfileId}`}
                                    className={`flex gap-2 items-center justify-center px-4 py-2 border-2 rounded-lg border-transparent ${isLoading ? 'bg-zinc-800 text-white' : 'bg-brand-secondary text-white hover:bg-transparent hover:text-brand-secondary hover:border-brand-secondary'} font-semibold  duration-300 min-w-[132px]`}
                                >
                                    Ver veterinário
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-zinc-200 w-full h-0.5 rounded-xl" />

                <div className="p-8 flex flex-col gap-4 text-semibold">
                    <h2 className="font-semibold text-zinc-800 text-xl">Agendamento</h2>
                    <div>
                        <h3 className="text-semibold"><span className="text-zinc-500">Data:</span> {parseDate(data?.appointment_date)}</h3>
                        <h3 className="text-semibold"><span className="text-zinc-500">Serviço:</span> {data?.service}</h3>
                        <h3 className="text-semibold"><span className="text-zinc-500">Pet:</span> {petSelect?.name}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}