import { Pet } from '@/app/(auth)/dashboard/page';
import { ModalPetCard } from '@/app/user/(auth)/pets/components/ModalPetCard';
import { CalendarBlock } from '@/app/vet/(auth)/petConsult/components/DashboardBlocks/CalendarBlock';
import { ConsultBlock } from '@/app/vet/(auth)/petConsult/components/DashboardBlocks/ConsultBlock';
import { NotesBlock } from '@/app/vet/(auth)/petConsult/components/DashboardBlocks/NotesBlock';
import { PetCardBlock } from '@/app/vet/(auth)/petConsult/components/DashboardBlocks/PetCardBlock';
import { PetIdBlock } from '@/app/vet/(auth)/petConsult/components/DashboardBlocks/PetIdBlock';
import { PetInfoBlock } from '@/app/vet/(auth)/petConsult/components/DashboardBlocks/PetInfoBlock';
import { UserBlock } from '@/app/vet/(auth)/petConsult/components/DashboardBlocks/UserBlock';
import { VaccinationBlock } from '@/app/vet/(auth)/petConsult/components/DashboardBlocks/VaccinationBlock';
import { CreatePetSchema } from '@/utils/actions/AddPet';
import { ClipboardPlus } from 'lucide-react';
import React, { useState } from 'react';

export default function PetsBoard({ pets }: { pets: Pet[] }) {
  const [openModal, setOpenModal] = useState(false)
  const pet = pets.length > 0 ? pets[0] : undefined;

  const handleModal = () => {
    setOpenModal(!openModal)
  }

  return (
    <>
      {pet ?
        <div className="w-full h-full items-start justify-start px-8 py-4 flex gap-4 animate-fade-in">
          <div className="flex flex-col w-72 gap-4 animate-fade-in">
            <PetIdBlock pet={pet} />
            <PetInfoBlock pet={pet} />
            <UserBlock pet={pet} />
          </div>
          <div className="flex flex-col gap-4 w-1/3 animate-fade-in">
            <NotesBlock pet={pet} />
            <VaccinationBlock pet={pet} />
          </div>
          <div className="flex flex-col flex-1 gap-4 animate-fade-in">
            <ConsultBlock pet={pet} />
            <div className="flex gap-4 animate-fade-in">
              <CalendarBlock />
              <PetCardBlock pet={pet} handle={handleModal}/>
            </div>
          </div>
        </div> :
        <div className='h-full flex items-center justify-center flex-col text-center gap-8'>
          <ClipboardPlus className='text-white bg-vet-primary rounded-xl p-2 h-16 w-16'/>
          <div className='flex flex-col gap-2'>
            <h2 className='font-bold text-3xl text-vet-primary'>Comece as consultas por aqui!</h2>
            <h3 className='font-semibold text-sm text-zinc-500'>Digite o id do pet desejado no campo acima <br />para começar as consultas.</h3>
          </div>
        </div>
      }
      {openModal && <ModalPetCard pet={pet} handleOpen={handleModal}/>}
    </>
  )
}
