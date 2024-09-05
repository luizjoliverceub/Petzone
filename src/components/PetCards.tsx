"use client"

import { Pet } from '@/app/(auth)/dashboard/page'
import { removePetById } from '@/utils/actions/RemovePetById';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


export default function PetCard({ petData, remove }: { petData: Pet[], remove: boolean }) {

  const petBirthDate = petData.length > 0 ? new Date(petData[0]?.birthDate) : null
  const formatedDate = petBirthDate !== null ? new Intl.DateTimeFormat("pt-br").format(petBirthDate) : null

  const router = useRouter()


  async function handleRemovePet(petId: string) {

    try {
      await removePetById(petId)
      toast.error('Pet Removido com sucesso!')
      toast.error('Pet Removido com sucesso!')
      router.push("/pets")
    } catch (error) {
      console.log(error);

    }
  }

  return (
    <div className='h-full w-full  flex'>
      {
        petData.length ? (petData.map((pet) => (
          <div key={pet.id} className='h-full w-full flex'>

            <div className='h-full w-1/3 bg-blue-200 text-white p-4  flex  justify-center '>

              <div className='bg-purple-300 w-20 h-20'>
                <img src="/gato2.jpg" alt="gato" className='w-full h-full' />
              </div>

            </div>

            <div className='h-full w-2/3 bg-brand-secondary gap-2 flex flex-col justify-center items-center relative py-2'>
              {remove ? (<button className="  absolute top-0 right-0  p-1 hover:text-red-500"
                onClick={() => handleRemovePet(pet.id)}>X
              </button>) : null}
              <div className=' h-full w-full overflow-hidden max-h-96'>
                <div className='px-4'>
                  <span className='text-sm'>Name</span>
                  <p className=' pl-4 w-full rounded-md bg-blue-200'>{pet.name}</p>
                </div>
                <div className='w-full px-4 flex gap-2'>
                  <div className='w-1/2'>
                    <span className='text-sm'>Sex</span>
                    <p className=' pl-4 w-full rounded-md bg-blue-200'>{pet.sex}</p>
                  </div>
                  <div className='w-1/2'>
                    <span className='text-sm'>age</span>
                    <p className=' pl-4 w-full rounded-md bg-blue-200'>{pet.age}</p>
                  </div>
                </div>

                <div className='px-4 flex gap-2'>
                  <div className='w-1/2'>
                    <span className='text-sm'>Race</span>
                    <p className=' pl-4 l w-full rounded-md bg-blue-200'>{pet.race}</p>
                  </div>

                  <div className='w-1/2'>
                    <span className='text-sm'>Birth</span>
                    <p className=' px-4 w-full rounded-md bg-blue-200'>{formatedDate}</p>
                  </div>

                </div>

                <div className='px-4'>
                  <span className='text-sm'>Notes</span>
                  <p className=' pl-4  w-full rounded-md bg-blue-200'>{pet.notes}</p>
                </div>

              </div>
            </div>

          </div>
        ))) : (<div className='flex items-center justify-center w-full h-full'>
          <p>Nenhum pet cadastrado ...</p>
        </div>)
      }
    </div>
  )
}
