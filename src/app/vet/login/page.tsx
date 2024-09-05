"use client";

import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { signIn, useSession } from "next-auth/react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
    email: z.string().email("Por favor, insira um email válido."),
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    name: z.string().optional(),
    role: z.string().default('veterinarian'),
    crmv: z.string().optional(),
    cep: z.string().optional(),
    region: z.string().optional(),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export default function LoginVeterinario() {
    const [show, setShow] = useState('password');
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === 'authenticated') {
            if (session?.user?.role === "normal") {
                router.push('/user/home');
            } else if (session?.user?.role === "veterinarian") {
                router.push('/vet/home');
            }
        }
    }, [session, status, router]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        watch
    } = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        mode: 'onChange'
    });

    // Monitorar os valores dos campos
    const watchEmail = watch("email");
    const watchPassword = watch("password");

    const handleShow = () => {
        setShow((prev) => (prev === 'password' ? 'text' : 'password'));
    }

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
            router.push("/vet/home");
        }
    }

    return (
        <div className="p-4 h-screen w-full flex justify-between gap-2 animate-fade-in">
            <div className="w-[45%] flex flex-col items-center justify-between">
                <div className="px-6 py-4 flex justify-between w-full">
                    <Link href={'/welcome'} className="text-2xl font-bold text-vet-secondary">Petzone</Link>
                    <Link href={'/welcome'}
                        className="px-2 rounded-md flex align-middle text-base font-semibold text-vet-primary items-center justify-center gap-2 hover:bg-zinc-300 duration-300"
                    >
                        <ArrowLeft className="size-5 text-vet-primary" strokeWidth={2.5} /> Voltar ao início
                    </Link>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-5xl font-semibold text-vet-primary">Entrar</h2>
                        <p className="text-lg font-semibold text-zinc-500">Digite seu email e senha para acessar o Petzone</p>
                    </div>
                    <form className="flex flex-col gap-2 relative" onSubmit={handleSubmit(onLogin)}>
                        <input
                            type="text"
                            placeholder="Email"
                            className={`outline-none border-2 rounded-lg py-2 px-4 w-full font-medium ${errors.email && watchEmail.length > 0 ? 'border-red-500' : 'border-zinc-300'}`}
                            {...register("email")}
                        />
                        {errors.email && watchEmail.length > 0 && <p className="text-red-500 text-sm">{errors.email.message}</p>}

                        <input
                            type={show}
                            placeholder="Senha"
                            className={`outline-none border-2 rounded-lg py-2 px-4 w-full font-medium ${errors.password && watchPassword.length > 0 ? 'border-red-500' : 'border-zinc-300'}`}
                            {...register("password")}
                        />
                        {errors.password && watchPassword.length > 0 && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                        <div className="text-end">
                            <Link href={'#'} className="text-xs font-semibold text-vet-secondary hover:underline">Esqueceu sua senha?</Link>
                        </div>

                        <button className="absolute bottom-28 right-6 duration-300" type="button" onClick={handleShow}>
                            {show === 'password' ?
                                <EyeOff strokeWidth={2.5} className="text-zinc-500 size-5 hover:text-zinc-700 duration-300" /> :
                                <Eye strokeWidth={2.5} className="text-zinc-500 size-5 hover:text-zinc-700 duration-300" />}
                        </button>

                        <button
                            className={`${isValid ? 'bg-vet-secondary hover:bg-transparent hover:border-vet-secondary hover:text-vet-secondary' : 'bg-zinc-600'} text-white font-semibold text-lg rounded-md py-1.5 px-4 border-2 border-transparent  duration-300 mt-4`}
                            type="submit"
                            disabled={isSubmitting || !isValid}
                        >
                            {isSubmitting ? 'Entrando...' : 'Entrar'}
                        </button>
                    </form>
                   
                </div>
                <div>
                    <Link href={'/vet/register'} className="text-sm font-medium">
                        Ainda não possui uma conta de veterinário? <span className="text-vet-secondary font-semibold hover:underline">Registre-se aqui</span>
                    </Link>
                </div>
            </div>
            <div className="bg-vet-secondary h-full w-[55%] rounded-3xl"></div>
        </div>
    );
}
