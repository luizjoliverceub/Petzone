import { AppointmentType } from "@/models/Types";
import { AlterStatus } from "@/utils/actions/AlterStatus";
import { createConversation } from "@/utils/actions/CreateConversation";
import dayjs from "dayjs";
import { Ban, Check } from "lucide-react";
import { useSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export function ModalOptions({ appointStatus }: { appointStatus: AppointmentType | undefined }) {
    const { id } = useParams<{ id: string }>()

    const handleStatus = async (status: string) => {
        const dataForm = { status };
        try {
            await AlterStatus(dataForm, id);
            if (status === 'confirmed') {
                await createRoom();
            }
            toast.success('Consulta aceita com sucesso!')
        } catch (error) {
            console.error('Error changing status or creating room:', error);
            toast.error('Falha em aceitar consulta!')
        }
    };

    const { data: sessionData } = useSession()
    const router = useRouter()
    const userEmail = sessionData?.user?.email

    const createRoom = async () => {
        const res = await createConversation({
            clientEmail: appointStatus?.email,
            veterinarianEmail: userEmail,
            session: sessionData,
            started_at: dayjs(appointStatus?.appointment_date),
            ended_at: dayjs(appointStatus?.appointment_date).add(30, 'minutes')
        })

        const conversationId = res.id
        // console.log(res)

        router.push(`/vet/message/${conversationId}`)
    }

    // console.log(appointStatus)

    return (
        <div className="border-2 rounded-xl absolute 2xl:left-14 2xl:top-0 xl:-left-8 xl:top-14 animate-fade-in flex flex-col gap-1 p-1 bg-white">
            {appointStatus?.status == 'pending' && <button
                onClick={() => { handleStatus('confirmed') }}
                className="group flex gap-2 px-4 py-2 justify-center items-center font-bold text-sm text-nowrap hover:bg-green-500 hover:text-white duration-300 rounded-xl"
            >
                <Check className="size-4 text-green-500 group-hover:text-white duration-300" strokeWidth={3} />
                Aceitar consulta
            </button>}

            {appointStatus?.status == 'pending' && <button
                onClick={() => { handleStatus('denied') }}
                className="group flex gap-2 px-4 py-2 justify-center items-center font-bold text-sm text-nowrap hover:bg-red-500 hover:text-white duration-300 rounded-xl"
            >
                <Ban className="size-4 text-red-500 group-hover:text-white duration-300" strokeWidth={3} />
                Recusar consulta
            </button>}

            {appointStatus?.status === 'confirmed' && <button
                onClick={() => { handleStatus('canceled') }}
                className="group flex gap-2 px-4 py-2 justify-center items-center font-bold text-sm text-nowrap hover:bg-red-500 hover:text-white duration-300 rounded-xl"
            >
                <Ban className="size-4 text-red-500 group-hover:text-white duration-300" strokeWidth={3} />
                Cancelar consulta
            </button>}

        </div>
    )
}