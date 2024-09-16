'use client'

import { useUser } from "@/contexts/UserContext";
import { CreatePetSchema } from "@/utils/actions/AddPet";
import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { RemovePet } from "./RemovePet";
import { PetCardBlock } from "./DashboardBlocks/PetCardBlock";
import { CalendarBlock } from "./DashboardBlocks/CalendarBlock";
import { ConsultBlock } from "./DashboardBlocks/ConsultBlock";
import { VaccinationBlock } from "./DashboardBlocks/VaccinationBlock";
import { NotesBlock } from "./DashboardBlocks/NotesBlock";
import { UserBlock } from "./DashboardBlocks/UserBlock";
import { PetInfoBlock } from "./DashboardBlocks/PetInfoBlock";
import { PetIdBlock } from "./DashboardBlocks/PetIdBlock";
import { ModalPetCard } from "./ModalPetCard";

dayjs.extend(localizedFormat)

export function PetDashboard() {
    const { pets, session } = useUser()
    const { id } = useParams<{ id: string }>()
    const [openRemove, setOpenRemove] = useState(false)
    const [openPetCard, setOpenPetCard] = useState(false)
    const router = useRouter()

    const pet = pets.find(pet => pet.id === id) as CreatePetSchema

    if (!pet) {
        router.push('/user/pets');
        return null;
    }

    const handleOpenRemove = () => {
        setOpenRemove(!openRemove)
    }

    const handleOpenPetCard = () => {
        setOpenPetCard(!openPetCard)
    }

    return (
        <>
            <div className="w-full h-full items-start justify-start px-8 py-6 flex flex-col gap-4">
                <div className="flex w-full gap-4 items-center justify-center">
                    <PetIdBlock pet={pet} handleOpenRemove={handleOpenRemove} />
                    <PetInfoBlock pet={pet} session={session} handleOpenPetCard={handleOpenPetCard}/>
                    <NotesBlock pet={pet} />
                </div>
                <div className="flex gap-4 w-full">
                    <ConsultBlock pet={pet} />
                    <VaccinationBlock pet={pet} />
                    <CalendarBlock />
                </div>
            </div>
            {openRemove && <RemovePet handleRemove={handleOpenRemove} pet={pet} />}
            {openPetCard && <ModalPetCard pet={pet} handleOpen={handleOpenPetCard} />}
        </>
    )
}