"use client"

import { useUser } from '@/contexts/UserContext';
import { AlterModality } from '@/utils/actions/AlterModalityInfo';
import { AlterUserInfo } from '@/utils/actions/AlterUserInfo';
import { DeleteUserInfo } from '@/utils/actions/DeleteUserInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { Trash2 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';


type GetUserInfoT = {
  modality: string
  role: string,
  emailVerified: boolean

}



const alterSchema = z.object({
  modality: z.array(z.string()),

  

});

type AlterSchemaType = z.infer<typeof alterSchema>;

export default function AlterModalityForm({ modality, role, emailVerified }: GetUserInfoT) {
  const path = usePathname()
  const pathName = path.includes('/vet/config') ? true : false

  const [showPassword, setShowPassword] = useState<boolean>(false)

  const { handleLogout } = useUser()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, dirtyFields },
    watch
  } = useForm<AlterSchemaType>({
    resolver: zodResolver(alterSchema),
    mode: 'all'
  });

  async function onSubmit(data: AlterSchemaType) {
    console.log("submit data " + JSON.stringify(data));
    
    try {

      
      await AlterModality(data);
      toast.success('Usuário alterado com sucesso');

    } catch (error) {
      toast.error('Erro ao alterar usuário. Tente novamente.');
    }


  }

  async function onDelete() {
    const confirmed = window.confirm("Tem certeza que deseja deletar o usuário?");
    if (!confirmed) return;

    try {
      await DeleteUserInfo();
      handleLogout()
      toast.success('Usuário deletado com sucesso');
    } catch (error) {
      toast.error('Erro ao deletar o usuário. Tente novamente.');
    }
  }

  return (
    <form className="h-2/3 w-2/3 border-zinc-300 border rounded-xl shadow-lg flex animate-fade-in" onSubmit={handleSubmit(onSubmit)}>
      {/* Left Panel */}
      <div
        className={`p-10 ${pathName ? 'bg-vet-primary' : 'bg-brand-secondary'} h-full w-1/3 flex flex-col justify-center items-center text-white rounded-tl-xl rounded-bl-xl`}
      >
        <div className="w-36 h-36 rounded-full bg-zinc-100 mb-4"></div>

        <div className='pt-10 flex flex-col'>
          <span>EmailVerfied : <span className={pathName ? 'text-vet-secondary' : 'text-brand-primary'}>{emailVerified ? "Verificado" : "Não Verificado"}</span></span>
          <span>Role : <span className={pathName ? 'text-vet-secondary' : 'text-brand-primary'}>{role}</span></span>
        </div>
      </div>

      {/* Right Panel */}
      <div className="bg-white h-full w-2/3 p-8 flex flex-col justify-center relative rounded-tr-xl rounded-br-xl">
        <h3 className="text-2xl text-center font-semibold text-gray-800 mb-6">Configuração Atendimento</h3>
        <button className='absolute top-0 right-0 p-4' onClick={onDelete}><Trash2 className='text-red-400' /></button>

        <div className='flex flex-col  gap-10'>
          <div className='flex w-full gap-4' >
            <label htmlFor="currentModality" >Modalidades Atual:</label>
            <input type="text" id='currentModality' value={modality} className='text-zinc-400' disabled />
          </div>

          <div className='flex flex-col px-10 gap-8'>
            
              <h2 className='text-center text-md' >Mudar modalidades</h2>
           
              <div>
                <div className='w-full flex  justify-between items-center'>
                  <label htmlFor="virtual">Virtual</label>
                  <input type="checkbox" value="virtual" id='virtual' {...register("modality")}/>
                </div>
                <div className='w-full flex  justify-between items-center'>
                  <label htmlFor="presencial">Presencial</label>
                  <input type="checkbox" value="presencial" id='presencial' {...register("modality")} />
                </div>
                <div className='w-full flex  justify-between items-center'>
                  <label htmlFor="virtual">Domiciliar</label>
                  <input type="checkbox" value="domiciliar" {...register("modality")}/>
                </div>
              </div>
           
          </div>
        </div>


        <button
          type="submit"
          className={`mt-4 px-6 py-2 ${pathName ? 'bg-vet-secondary' : 'bg-brand-secondary'} text-white rounded-lg hover:brightness-90`}
          disabled={isSubmitting}
        >
          Aplicar alterações
        </button>
      </div>
    </form>
  );
}
