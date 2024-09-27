import { VaccinationBlock } from '@/components/InfoPet/DashboardBlocks/VaccinationBlock';
import { ModalPetCard } from '@/app/user/(auth)/pets/components/ModalPetCard';
import { CalendarBlock } from '@/app/vet/(auth)/petConsult/components/DashboardBlocks/CalendarBlock';
import { ConsultBlock } from '@/app/vet/(auth)/petConsult/components/DashboardBlocks/ConsultBlock';
import { NotesBlock } from '@/app/vet/(auth)/petConsult/components/DashboardBlocks/NotesBlock';
import { PetIdBlock } from '@/app/vet/(auth)/petConsult/components/DashboardBlocks/PetIdBlock';
import { PetInfoBlock } from '@/app/vet/(auth)/petConsult/components/DashboardBlocks/PetInfoBlock';
import { PetType } from '@/contexts/UserContext';
import { ClipboardPlus } from 'lucide-react';
import React, { useState } from 'react';

export default function PetsBoard({ pets }: { pets: PetType[] }) {
  const [openModal, setOpenModal] = useState(false)
  const pet = pets.length > 0 ? pets[0] : undefined;

  const handleModal = () => {
    setOpenModal(!openModal)
  }

  return (
    <>
      {pet ?
        <div className="w-full h-full items-center justify-center px-8 py-6 flex flex-col gap-4">
          <div className="flex w-full gap-4 items-center justify-center">
            <PetIdBlock pet={pet} />
            <PetInfoBlock pet={pet} handleOpenPetCard={handleModal} />
            <NotesBlock pet={pet} />
          </div>
          <div className="flex gap-4 w-full">
            <ConsultBlock pet={pet} />
            <VaccinationBlock pet={pet} />
            <CalendarBlock />
          </div>
        </div> :
        <div className='h-full flex items-center justify-center flex-col text-center gap-8'>
          <ClipboardPlus className='text-white bg-vet-primary rounded-xl p-2 h-16 w-16' />
          <div className='flex flex-col gap-2'>
            <h2 className='font-bold text-3xl text-vet-primary'>Comece as consultas por aqui!</h2>
            <h3 className='font-semibold text-sm text-zinc-500'>Digite o id do pet desejado no campo acima <br />para começar as consultas.</h3>
          </div>
        </div>
      }
      {openModal && <ModalPetCard pet={pet} handleOpen={handleModal} />}
    </>
  )
}
