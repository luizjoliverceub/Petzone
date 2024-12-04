'use client'

import { useParams, useRouter } from "next/navigation";
import { useQuery } from '@tanstack/react-query';
import { UserAppointType, VetUserType } from "@/models/Types";
import { FormCreateAppointment } from "./components/FormAppointment";
import {  useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BadgeCheck } from "lucide-react";
import { Service } from "./components/Service";
import { useUser } from "@/contexts/UserContext";
import { getUser } from "@/utils/actions/GetUser";
import { createConversation } from "@/utils/actions/CreateConversation";
import { useSession } from 'next-auth/react'
import dayjs from "dayjs";
import { loadStripe } from "@stripe/stripe-js";


const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
    const [open, setOpen] = useState(false)
    const { session } = useUser()
    const { id } = useParams<{ id: string }>();

    const email = session?.user?.email

    const user = useQuery({
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

    const { data, isLoading, error } = useQuery<VetUserType>({
        queryKey: ['vet-data', id],
        queryFn: () =>
            fetch(`/api/vets/${id}`).then((res) =>
                res.json()
            ),
        enabled: !!id
    })

    const appointArray = data?.Appointments

    const userData = useQuery<UserAppointType>({
        queryKey: ['userVet-data', id],
        queryFn: () =>
            fetch(`/api/user/${id}`).then((res) =>
                res.json()
            ),
        enabled: !!id
    })

    const handleOpen = () => {
        setOpen(!open)
    }

    const { data: sessionData } = useSession()
    const router = useRouter()
    const userEmail = sessionData?.user?.email

    const createRoom = async () => {
        const now = dayjs()

        const res = await createConversation({
            clientEmail: userEmail,
            veterinarianEmail: userData.data?.email,
            session: sessionData,
            started_at: now,
            ended_at: now.add(1, 'hour')
        })

        const conversationId = res.id
        console.log(now)
        console.log(now.add(1, 'hour'))

        router.push(`/user/message/${conversationId}`)
    }

    if (error) return <div>Falha ao carregar dados</div>;

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
                                        <h2 className="font-semibold text-3xl animate-fade-in">{userData.data?.name}</h2>
                                }
                                {
                                    isLoading ? null : <BadgeCheck className="text-brand-secondary animate-fade-in" />
                                }
                                <h3 className="hidden text-sm font-semibold group-hover:flex animate-fade-in gap-1 items-end">
                                    <span className="text-zinc-500 font-medium text-xs">CRMV:</span>
                                    {data?.crmv}
                                </h3>
                            </div>
                            <div className="flex flex-col gap-">
                                {isLoading ? <div className="rounded-lg bg-zinc-300 animate-pulse w-44 h-8" /> :
                                    <div className="flex gap-3 items-center animate-fade-in">
                                        <span className="text-2xl">🇧🇷</span>
                                        <h3 className="font-medium text-zinc-500">{data?.region}-DF, Brasil</h3>
                                    </div>}
                            </div>
                            <div className="flex gap-4">
                                {
                                    isLoading ? <div className="rounded-lg bg-zinc-300 animate-pulse w-40 h-6" /> :
                                        <h3 className="font-medium animate-fade-in"><span className="text-zinc-500">Email:</span> {userData.data?.email}</h3>
                                }

                                {
                                    isLoading ? <div className="rounded-lg bg-zinc-300 animate-pulse w-32 h-6" /> :
                                        <h3 className="font-medium animate-fade-in"><span className="text-zinc-500">CEP:</span> {data?.cep}</h3>
                                }

                            </div>
                        </div>
                        <div className="flex gap-4">

                            <div className="flex flex-col items-center justify-center">
                                <button
                                    type="button"
                                    className={`px-4 py-2 border-2 rounded-lg border-transparent ${isLoading ? 'bg-zinc-800 text-white' : 'bg-brand-primary text-white hover:bg-transparent hover:text-brand-primary hover:border-brand-primary'} font-semibold  duration-300`}
                                    disabled={isLoading}
                                    onClick={createRoom}
                                >
                                    Mensagem
                                </button>
                            </div>

                            <div className="flex flex-col items-center justify-center">
                                <button
                                    type="button"
                                    className={`px-4 py-2 border-2 rounded-lg border-transparent ${isLoading ? 'bg-zinc-800 text-white' : 'bg-brand-secondary text-white hover:bg-transparent hover:text-brand-secondary hover:border-brand-secondary'} font-semibold  duration-300`}
                                    disabled={isLoading}
                                    onClick={handleOpen}
                                >
                                    Realizar agendamento
                                </button>
                                {open && (
                                    
                                <FormCreateAppointment stripe={stripePromise} id={id} vetId={id} handle={handleOpen} userId={user.data?.id} appointArray={appointArray} vetEmail={userData.data?.email}/>
                            )
                                
                                }
                            </div>

                        </div>
                    </div>
                </div>

                <div className="bg-zinc-200 w-full h-0.5 rounded-xl" />

                <div className="p-8 flex flex-col gap-4">
                    <h2 className="font-semibold text-zinc-800 text-xl">Serviços</h2>
                    <div className="flex gap-4 flex-wrap">
                        {
                            isLoading ?
                                <>
                                    <div className="bg-zinc-300 rounded-xl w-full h-9 animate-pulse"></div>
                                    <div className="bg-zinc-300 rounded-xl w-full h-9 animate-pulse"></div>
                                </> :
                                data?.Service?.map(service => (
                                    <Service key={service.name} name={service.name} />
                                ))
                        }
                    </div>
                </div>
            </div>
        </div>
        
    );
}
