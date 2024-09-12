'use client'

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { parseDate } from "@/utils/actions/ParseDate";

export default function Home() {
    const { id } = useParams<{ id: string }>();
    const { appointments } = useUser()

    const appoint = appointments.find(appoint => appoint.id === id)

    return (
        <div className="h-screen flex-1 flex items-center justify-center py-4 pr-4">
            <div className="w-full h-full border-2 flex rounded-xl p-12 animate-fade-in shadow-md relative">
                <div className="h-60 w-60 rounded-full bg-zinc-800" />
                <h2>{appoint?.clientName}</h2>
                <h2>{appoint?.service}</h2>
                <h2>{parseDate(appoint?.appointment_date)}</h2>

                <Link
                    href={'/user/consults/allConsults'}
                    className="absolute left-4 top-4 text-zinc-500 hover:text-brand-secondary duration-300 flex gap-2"
                >
                    <ArrowLeft />
                    <span className="font-medium">Voltar</span>
                </Link>
            </div>
        </div>
    );
}