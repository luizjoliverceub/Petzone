'use client';

import { PetType, useUser } from "@/contexts/UserContext";
import { CreatePetSchema } from "@/utils/actions/AddPet";
import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat';
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { PetIdBlock } from "./DashboardBlocks/PetIdBlock";
import { PetInfoBlock } from "./DashboardBlocks/PetInfoBlock";
import { NotesBlock } from "./DashboardBlocks/NotesBlock";
import { ConsultBlock } from "./DashboardBlocks/ConsultBlock";
import { CalendarBlock } from "./DashboardBlocks/CalendarBlock";
import { VaccinationBlock } from "./DashboardBlocks/VaccinationBlock";
import { RemovePet } from "@/app/user/(auth)/pets/components/RemovePet";
import { ModalPetCard } from "@/app/user/(auth)/pets/components/ModalPetCard";
import { useQuery } from "@tanstack/react-query";
import { AppointmentType } from "@/models/Types";
import { getAppointmentPet } from "@/utils/actions/GetAppointmentPet";


dayjs.extend(localizedFormat);

export function PetDashboard({ petsVet }: { petsVet?: PetType[] }) {
    const { pets, session } = useUser();
    const { id } = useParams<{ id: string }>();
    const [openRemove, setOpenRemove] = useState(false);
    const [openPetCard, setOpenPetCard] = useState(false);
    const router = useRouter();

    console.log(pets);

    let pet: PetType | undefined;

    if (petsVet) {
        pet = petsVet[0];
    } else {
        pet = pets.find(pet => pet.id === id);
    }

    if (!pet) {
        router.push('/user/pets');
        return null;
    }

    const handleOpenRemove = () => {
        setOpenRemove(!openRemove);
    };

    const handleOpenPetCard = () => {
        setOpenPetCard(!openPetCard);
    };


    return (
        <>
            <div className="w-full h-full items-start justify-start px-8 py-6 flex flex-col gap-4">
                <div className="flex w-full gap-4 items-center justify-center">
                    <PetIdBlock pet={pet} handleOpenRemove={handleOpenRemove} />
                    <PetInfoBlock pet={pet} handleOpenPetCard={handleOpenPetCard} />
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
    );
}
