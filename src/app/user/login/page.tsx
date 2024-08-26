'use client'

import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useState } from 'react'
import Image from "next/image";
import googleBrand from '../../../../public/google-brand.svg'
import appleBrand from '../../../../public/apple-brand.svg'
import { signIn } from "next-auth/react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


const loginSchema = z.object({
   email: z.string().email(),
   password: z.string(),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export default function Home() {
    const [show, setShow] = useState('password');
    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema)
    });

    const handleShow = () => {
        setShow((prev) => (prev === 'password' ? 'text' : 'password'));
    }

    // Função de login
    async function onLogin(data: LoginSchemaType) {
        const signInResponse = await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
        });

        if (signInResponse?.error) {
            toast.error("Falha ao logar. Por favor, verifique seus campos.");
        } else {
            toast.success("Login realizado com sucesso!");
            router.push("/pets");
        }
    }

    return (
        <main className="p-4 h-screen w-full flex justify-between gap-2 animate-fade-in">
            <div className="w-[45%] flex flex-col items-center justify-between">
                <div className="px-6 py-4 flex justify-between w-full">
                    <Link href={'/welcome'} className="text-2xl font-bold text-brand-secondary">Petzone</Link>
                    <Link href={'/welcome'}
                        className="px-2 rounded-md flex align-middle text-base font-semibold text-brand-primary items-center justify-center gap-2 hover:bg-zinc-300 duration-300"
                    >
                        <ArrowLeft className="size-5 text-brand-primary" strokeWidth={2.5} /> Voltar ao início
                    </Link>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-5xl font-semibold text-brand-primary">Entrar</h2>
                        <p className="text-lg font-semibold text-zinc-500">Digite seu email e senha para acessar o seu Petzone</p>
                    </div>
                    <form className="flex flex-col gap-2 relative" onSubmit={handleSubmit(onLogin)}>
                        <input
                            type="text"
                            placeholder="Email"
                            className={`outline-none border-2 rounded-lg py-2 px-4 w-full font-medium ${errors.email ? 'border-red-500' : 'border-zinc-300'}`}
                            {...register("email", { required: true })}
                        />
                        {errors.email && <p className="text-red-500 text-sm">Por favor, insira um email válido.</p>}

                        <input
                            type={show}
                            placeholder="Senha"
                            className={`outline-none border-2 rounded-lg py-2 px-4 w-full font-medium ${errors.password ? 'border-red-500' : 'border-zinc-300'}`}
                            {...register("password", { required: true })}
                        />
                        {errors.password && <p className="text-red-500 text-sm">Por favor, insira sua senha.</p>}

                        <div className="text-end">
                            <Link href={'#'} className="text-xs font-semibold text-brand-secondary hover:underline">Esqueceu sua senha?</Link>
                        </div>

                        <button className="absolute bottom-28 right-6 duration-300" type="button" onClick={handleShow}>
                            {show === 'password' ?
                                <Eye strokeWidth={2.5} className="text-zinc-500 size-5 hover:text-zinc-700 duration-300" /> :
                                <EyeOff strokeWidth={2.5} className="text-zinc-500 size-5 hover:text-zinc-700 duration-300" />}
                        </button>
                        
                        <button
                            className="bg-brand-secondary text-white font-semibold text-lg rounded-md py-1.5 px-4 border-2 border-transparent hover:bg-transparent hover:border-brand-secondary hover:text-brand-secondary duration-300 mt-4"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>
                    <div className="flex gap-4 items-center">
                        <div className="h-0.5 flex-1 bg-zinc-300 rounded-xl"></div>
                        <p>Ou</p>
                        <div className="h-0.5 flex-1 bg-zinc-300 rounded-xl"></div>
                    </div>
                    <div className="w-full flex flex-col gap-2.5">
                        <button
                            className="flex gap-2 justify-center items-center w-full border-2 text-zinc-600 font-semibold rounded-md py-1.5 px-4 hover:bg-transparent hover:border-red-800 hover:text-red-800 duration-300"
                        >
                            <Image src={googleBrand} alt="" width={18} />
                            Entrar com o Google
                        </button>
                        <button
                            className="flex gap-2 justify-center items-center w-full border-2 text-zinc-600 font-semibold rounded-md py-1.5 px-4 hover:bg-transparent hover:border-zinc-800 hover:text-zinc-800 duration-300"
                        >
                            <Image src={appleBrand} alt="" width={20} />
                            Entrar com o Apple ID
                        </button>
                    </div>
                </div>
                <div>
                    <Link href={'/user/register'} className="text-sm font-medium">
                        Ainda não possui uma conta? <span className="text-brand-secondary font-semibold hover:underline">Registre-se aqui</span>
                    </Link>
                </div>
            </div>
            <div className="bg-brand-secondary h-full w-[55%] rounded-3xl"></div>
        </main>
    )
}