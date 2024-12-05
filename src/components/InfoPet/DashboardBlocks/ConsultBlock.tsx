import { useUser } from "@/contexts/UserContext";
import { AppointmentType } from "@/models/Types";
import { CreatePetSchema } from "@/utils/actions/AddPet";
import { getAppointmentPet } from "@/utils/actions/GetAppointmentPet";
import { parseDate } from "@/utils/actions/ParseDate";
import { useQuery } from "@tanstack/react-query";
import { Eye, Plus } from "lucide-react";
import Link from "next/link";

export function ConsultBlock({ pet }: { pet: CreatePetSchema | undefined }) {
    const { session } = useUser()

    const { data, isLoading } = useQuery({
        queryKey: ['appointments', pet?.id],
        queryFn: async () => {
            const data: AppointmentType[] = await getAppointmentPet(pet?.id)

            return data
        },
        enabled: !!pet?.id
    })

    return (
        <div className="border-2 p-8 rounded-xl flex flex-col h-full w-1/3 flex-1 gap-8 max-h-[410px]">
            <div className="flex justify-between">
                <h2 className="font-semibold text-zinc-700">Consultas</h2>
                {
                    session?.user?.role === 'normal' &&
                    <Link href={'/user/consults'} className="flex gap-2 justify-center items-center p-1 text-brand-primary font-medium border-2 rounded-lg hover:bg-brand-primary hover:text-white hover:border-brand-primary duration-300">
                        <p className="text-xs hidden xl:flex ml-2">Agendar consulta</p>
                        <Plus className="size-4" />
                    </Link>
                }
            </div>
            <div className="w-full h-full flex-1 flex flex-col gap-2 items-center justify-start overflow-y-auto">
                {isLoading ?
                    <div className="flex flex-col gap-2 w-full">
                        <div className="bg-zinc-300 w-full h-[58px] rounded-md animate-pulse" />
                        <div className="bg-zinc-300 w-full h-[58px] rounded-md animate-pulse" />
                        <div className="bg-zinc-300 w-full h-[58px] rounded-md animate-pulse" />
                        <div className="bg-zinc-300 w-full h-[58px] rounded-md animate-pulse" />
                    </div> :
                    data && data?.length > 0 ? data?.map(appoint => (
                        <div
                            key={appoint.id}
                            className="w-full border px-6 py-2 rounded-md flex justify-between items-center animate-fade-in"
                        >
                            <div className="flex gap-4">
                                <h3 className="text-zinc-500 text-xs">Nome: <p className="text-zinc-700 text-base">{appoint.service}</p></h3>
                                <h3 className="text-zinc-500 text-xs">Data: <p className="text-zinc-700 text-base">{parseDate(appoint.appointment_date)}</p></h3>
                            </div>
                            <Link
                                href={`/user/consults/allConsults/${appoint.id}`}
                                className="p-2 rounded-md text-brand-secondary hover:text-white hover:bg-brand-secondary text-sm flex gap-1 justify-center items-center duration-300"
                            >
                                Mostrar
                                <Eye className="size-4" />
                            </Link>
                        </div>
                    )) :
                        <p className="text-zinc-500 font-medium">Sem consultas registradas sobre o {pet?.name}</p>}
            </div>
        </div>
    )
}