'use client'

import { useUser } from "@/contexts/UserContext"
import { CreatePetSchema } from "@/utils/actions/AddPet";
import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { Check, Copy, ExternalLink, Plus, Settings, View } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Options } from "./Options";
import { RemovePet } from "./RemovePet";
import Link from "next/link";
import { Calendar } from "@/components/ui/calendar"
import { PetCardBlock } from "./DashboardBlocks/PetCardBlock";
import { CalendarBlock } from "./DashboardBlocks/CalendarBlock";
import { ConsultBlock } from "./DashboardBlocks/ConsultBlock";
import { VaccinationBlock } from "./DashboardBlocks/VaccinationBlock";
import { NotesBlock } from "./DashboardBlocks/NotesBlock";
import { UserBlock } from "./DashboardBlocks/UserBlock";
import { PetInfoBlock } from "./DashboardBlocks/PetInfoBlock";
import { PetIdBlock } from "./DashboardBlocks/PetIdBlock";

dayjs.extend(localizedFormat)

export function PetDashboard() {
    const { pets, session } = useUser()
    const { id } = useParams<{ id: string }>()
    const [openRemove, setOpenRemove] = useState(false)
    const router = useRouter()

    const pet = pets.find(pet => pet.id === id) as CreatePetSchema

    if (!pet) {
        router.push('/user/pets');
        return null;
    }

    const handleOpenRemove = () => {
        setOpenRemove(!openRemove)
    }

    return (
        <>
            <div className="w-full h-full items-start justify-start px-8 py-6 flex gap-4">
                <div className="flex flex-col w-72 gap-4">
                    <PetIdBlock pet={pet} handleOpenRemove={handleOpenRemove} />
                    <PetInfoBlock pet={pet}/>
                    <UserBlock pet={pet} session={session} />
                </div>
                <div className="flex flex-col gap-4 w-1/3">
                    <NotesBlock pet={pet} />
                    <VaccinationBlock pet={pet} />
                </div>
                <div className="flex flex-col flex-1 gap-4">
                    <ConsultBlock pet={pet}/>
                    <div className="flex gap-4">
                        <CalendarBlock />
                        <PetCardBlock pet={pet} />
                    </div>
                </div>
            </div>
            {openRemove && <RemovePet handleRemove={handleOpenRemove} pet={pet} />}
        </>
    )
}