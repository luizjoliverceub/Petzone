"use client"

import { useUser } from '@/contexts/UserContext';
import { AlterUserInfo } from '@/utils/actions/AlterUserInfo';
import { DeleteUserInfo } from '@/utils/actions/DeleteUserInfo';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Router, Trash2 } from 'lucide-react';
import React, { ReactNode, useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';


 type GetUserInfoT = {
    name:string,
    email:string,
    password:string,
    role:string,
    emailVerified:boolean
 }



 const alterSchema = z.object({
    name: z.string().min(1,"Nome é obrigatório"),
    email: z.string().email('Email inválido'),
    password:z.string().min(4,"Senha é obrigatório 4 caracteres"),
    role:z.string().nullish(),
    emailVerified:z.string().nullish()
    
});

type AlterSchemaType = z.infer<typeof alterSchema>;

export default function AlterUserForm({email,name,password,role,emailVerified} : GetUserInfoT) {

  const [showPassword,setShowPassword] = useState<boolean>(false)

  const {handleLogout} = useUser()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid, dirtyFields },
        watch
    } = useForm<AlterSchemaType>({
        resolver: zodResolver(alterSchema),
        mode: 'all'
    });

    async function onSubmit (data :AlterSchemaType) {

        try {
           

            await AlterUserInfo(data);
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
    <form className="h-2/3 w-2/3 border-zinc-300 border rounded-lg shadow-lg flex" onSubmit={handleSubmit(onSubmit)}>
      {/* Left Panel */}
      <div className="p-10 bg-brand-secondary h-full w-1/3 flex flex-col justify-center items-center text-white">
        <div className="w-36 h-36 rounded-full bg-zinc-100 mb-4"></div>
        <h2 className="text-xl font-bold">{name}</h2>
       
        <div className='pt-10 flex flex-col'>
           <span>EmailVerfied : <span className='text-brand-primary'>{emailVerified ? "Verificado" : "Não Verificado"}</span></span>
          <span>Role : <span className='text-brand-primary'>{role }</span></span> 
        </div>
      </div>

      {/* Right Panel */}
      <div className="bg-white h-full w-2/3 p-8 flex flex-col justify-center relative">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Informações da conta</h3>
        <button className='absolute top-0 right-0 p-4' onClick={onDelete}><Trash2 className='text-red-400'/></button>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="text"
            {...register("email")}
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            defaultValue={email}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="username">
            Nome
          </label>
          <input
            type="text"
            {...register("name")}
            id="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary"
            defaultValue={name}
          />
        </div>

        <div className="mb-4 relative">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
            Senha
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-secondary"
              defaultValue={password}
            />
            <div
              className="absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <EyeOff className="text-gray-500" /> : <Eye className="text-gray-500" />}
            </div>
          </div>
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-brand-secondary text-white rounded-lg hover:brightness-90"
          disabled={isSubmitting}
        >
          Aplicar alterações
        </button>
      </div>
    </form>
  );
}
