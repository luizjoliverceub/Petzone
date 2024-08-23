"use client"

import Link from 'next/link'
import React, { useState } from 'react'
import { signIn } from "next-auth/react"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { registerVeterinario } from '@/utils/actions/RegisterUserVeterinarian'


const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string().nullish(),
    role: z.string(),
    crmv: z.string().nullish(),
    cep: z.string().nullish(),
    region: z.string().nullish()
});

type typeLoginSchema = z.infer<typeof loginSchema>


export default function FormNoAuth({ formTitle }: { formTitle: 'Login (Veterinário)' | 'Register Veterinário' }) {

    const opositeTitle = formTitle === "Login (Veterinário)" ? "register" : "login"

    const question = formTitle === "Login (Veterinário)" ? "Forgot password ?" : "login"

    const [loginError, setLoginError] = useState("")

    const router = useRouter()
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors, isSubmitting }
    } = useForm<typeLoginSchema>({
        resolver: zodResolver(loginSchema)
    })


    async function onLogin(data: typeLoginSchema) {

        const signInResponse = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,

        })

        if (signInResponse?.error) {
            toast.error("Falha ao logar. Por favor cheque seus campos ")
        } else {

            toast.success("Login realizado com sucesso!")
            router.push("/login")
        }



        //arrumar redirect , pois quando esta cadastrado funciona normal , porém quando nao tenho uma conta e tento acessar , redireciona para o sing in criado automatico
        //e não mostra o erro na página em si 


        //handler errors , message errors 
    }

    async function onRegister(data: typeLoginSchema) {

        const signInResponse = await registerVeterinario(data)
        toast.success('Usuario Criado com sucesso!')
        router.push("/veterinario/allPets")
        //arrumar redirect , pois quando esta cadastrado funciona normal , porém quando nao tenho uma conta e tento acessar , redireciona para o sing in criado automatico
        //e não mostra o erro na página em si 


        //handler errors , message errors 
    }


    return (
        formTitle === "Login (Veterinário)" ? (<div className='h-[70%] w-[60%]'>
            <h2 className='text-3xl font-semibold text-brand-primary text-center mb-8'>{formTitle}</h2>
            <p className='text-center'>Don`t have account? <Link className='text-brand-secondary' href={`/${opositeTitle}`}>{opositeTitle}</Link></p>
            <div>




                <form className='flex flex-col gap-3 mt-4' onSubmit={handleSubmit(onLogin)}>

                    <label htmlFor="email" className='text-brand-primary font-medium'>Email adress</label>
                    <input type="email" {...register("email", { required: true })} placeholder={`✉️ Example@gmail.com`} className='ring-1 ring-slate-300 py-1 px-3 text-brand-third ' />

                    <label htmlFor="password" className='text-brand-primary font-medium'>Password</label>
                    <input type="password"  {...register("password", { required: true })} placeholder={`🔑 your password`} className=' w-full ring-1 ring-slate-300 py-1 px-3 text-brand-third ' />

                    <input type="hidden" id="role"  {...register("role", { required: true })} value="veterinarian" />

                    <button className='bg-brand-secondary text-white py-1 w-full mt-4' type='submit'>{formTitle}</button>

                    <Link href={""} className='hover:text-brand-secondary text-center'>{question}</Link>
                </form>

            </div>
        </div>) : (
            <div className='h-[90%] w-[60%]'>
                <h2 className='text-3xl font-semibold text-brand-primary text-center mb-4'>{formTitle}</h2>

                <form className='flex flex-col gap-3 mt-4' onSubmit={handleSubmit(onRegister)}>
                    <h2 className='text-2xl font-semibold text-brand-primary text-center mb-8'>Informações pessoais</h2>
                    <div className='flex flex-col gap-3'>
                        <label htmlFor="username" className='text-brand-primary font-medium'>UserName</label>
                        <input type="text" {...register("name", { required: true })} id='username' placeholder={`Ex : Jhon984`} className='ring-1 ring-slate-300 py-1 px-3 text-brand-third ' />
                        <label htmlFor="email" className='text-brand-primary font-medium'>Email adress</label>
                        <input type="email"  {...register("email", { required: true })} id='email' placeholder={`✉️ Example@gmail.com`} className='ring-1 ring-slate-300 py-1 px-3 text-brand-third ' />
                        <input type="hidden" id="role"  {...register("role", { required: true })} value="veterinarian" />
                        <label htmlFor="password" className='text-brand-primary font-medium'>Password</label>

                        <input type="password"  {...register("password", { required: true })} name='password' id='password' placeholder={`🔑 your password`} className=' w-full ring-1 ring-slate-300 py-1 px-3 text-brand-third ' />
                        <label htmlFor="region" className='text-brand-primary font-medium'>Região</label>
                    </div>

                    <div className='flex flex-col gap-3 mt-5'>

                        <h2 className='text-2xl font-semibold text-brand-primary text-center mb-8'>Informações profissionais</h2>

                        <label htmlFor="username" className='text-brand-primary font-medium'>Crmv</label>
                        <input type="text" {...register("crmv", { required: true })} id='username' placeholder={`Ex : CRMV-DF 54321`} className='ring-1 ring-slate-300 py-1 px-3 text-brand-third ' />
                        <label htmlFor="username" className='text-brand-primary font-medium'>Cep clinica</label>
                        <input type="text" {...register("cep", { required: true })} id='username' className='ring-1 ring-slate-300 py-1 px-3 text-brand-third ' />
                        <label htmlFor="region" className='text-brand-primary font-medium'>Região</label>
                        <select {...register("region", { required: true })} id='region' className='ring-1 ring-slate-300 py-1 mt-2 px-3 text-brand-third '>
                            <option value="">Selecione uma região</option>
                            <option value="Águas Claras">Águas Claras</option>
                            <option value="Asa sul">Asa sul</option>
                            <option value="Asa norte">Asa norte</option>
                            <option value="Brasília">Brasília</option>
                            <option value="Ceilândia">Ceilândia</option>
                            <option value="Taguatinga">Taguatinga</option>
                            <option value="Gama">Gama</option>
                            <option value="Guará">Guará</option>
                            <option value="Planaltina">Planaltina</option>
                            <option value="Samambaia">Samambaia</option>
                            <option value="Sobradinho">Sobradinho</option>
                            <option value="Vicente Pires">Vicente Pires</option>

                        </select>

                    </div>
                    <button className='bg-brand-secondary text-white py-1 w-full mt-2'>{formTitle}</button>
                </form>

                <div className="flex items-center justify-center gap-4 mt-4">
                    <p className='text-center'>have an account?   <Link href={"/login"} className='text-brand-secondary'>{question}</Link></p>
                </div>




            </div>

        )
    )
}
